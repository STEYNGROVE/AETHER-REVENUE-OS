/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import crypto from 'crypto';
import https from 'https';

export interface BinanceAccountInfo {
  status: string;
  isConfigured: boolean;
  canRead: boolean;
  canWithdraw: boolean;
  ipRestricted: boolean;
  nonZeroBalances: { coin: string; free: string; locked: string }[];
  withdrawalHistory: {
    id: string;
    amount: string;
    transactionFee: string;
    coin: string;
    status: number;
    address: string;
    txId: string;
    applyTime: string;
    network: string;
    completeTime?: string;
    explorerUrl?: string;
  }[];
  lastFetchedAt: string;
}

let cachedInfo: BinanceAccountInfo | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 15000; // 15 seconds

function signedRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', bodyParams?: Record<string, any>): Promise<{ status: number; data: any }> {
  return new Promise((resolve) => {
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_API_SECRET;

    if (!apiKey || !apiSecret) {
      return resolve({ status: 400, data: { error: 'BINANCE_API_KEY or BINANCE_API_SECRET not configured' } });
    }

    const timestamp = Date.now();
    let queryString = `timestamp=${timestamp}`;

    if (bodyParams) {
      const extra = Object.entries(bodyParams)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
      if (extra) {
        queryString = `${extra}&${queryString}`;
      }
    }

    const signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex');
    const fullPath = method === 'GET' 
      ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryString}&signature=${signature}`
      : `${endpoint}?${queryString}&signature=${signature}`;

    const req = https.request({
      hostname: 'api.binance.com',
      path: fullPath,
      method,
      headers: {
        'X-MBX-APIKEY': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 10000
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          resolve({ status: res.statusCode || 200, data: parsed });
        } catch {
          resolve({ status: res.statusCode || 200, data: raw });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ status: 500, data: { error: err.message } });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 504, data: { error: 'Binance API timeout' } });
    });

    req.end();
  });
}

export function getExplorerUrlForNetwork(network: string, txId: string): string {
  if (!txId) return '';
  const net = network.toUpperCase();
  if (net === 'MATIC' || net === 'POLYGON') {
    return `https://polygonscan.com/tx/${txId}`;
  }
  if (net === 'TRX' || net === 'TRON') {
    return `https://tronscan.org/#/transaction/${txId}`;
  }
  if (net === 'BSC' || net === 'BNB') {
    return `https://bscscan.com/tx/${txId}`;
  }
  if (net === 'ETH' || net === 'ETHEREUM') {
    return `https://etherscan.io/tx/${txId}`;
  }
  return `https://blockchair.com/search?q=${txId}`;
}

export async function fetchLiveBinanceAccount(): Promise<BinanceAccountInfo> {
  const now = Date.now();
  if (cachedInfo && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedInfo;
  }

  const apiKey = process.env.BINANCE_API_KEY;
  const apiSecret = process.env.BINANCE_API_SECRET;

  if (!apiKey || !apiSecret) {
    return {
      status: 'NOT_CONFIGURED',
      isConfigured: false,
      canRead: false,
      canWithdraw: false,
      ipRestricted: false,
      nonZeroBalances: [],
      withdrawalHistory: [],
      lastFetchedAt: new Date().toISOString()
    };
  }

  try {
    const [statusRes, restrRes, balancesRes, historyRes] = await Promise.all([
      signedRequest('/sapi/v1/account/status'),
      signedRequest('/sapi/v1/account/apiRestrictions'),
      signedRequest('/sapi/v1/capital/config/getall'),
      signedRequest('/sapi/v1/capital/withdraw/history')
    ]);

    const canRead = restrRes.data?.enableReading ?? (statusRes.status === 200);
    const canWithdraw = Boolean(restrRes.data?.enableWithdrawals);
    const ipRestricted = Boolean(restrRes.data?.ipRestrict);

    let nonZeroBalances: { coin: string; free: string; locked: string }[] = [];
    if (Array.isArray(balancesRes.data)) {
      nonZeroBalances = balancesRes.data
        .filter((c: any) => parseFloat(c.free) > 0 || parseFloat(c.locked) > 0)
        .map((c: any) => ({
          coin: c.coin,
          free: c.free,
          locked: c.locked
        }));
    }

    let withdrawalHistory: any[] = [];
    if (Array.isArray(historyRes.data)) {
      withdrawalHistory = historyRes.data.map((h: any) => ({
        id: h.id,
        amount: h.amount,
        transactionFee: h.transactionFee,
        coin: h.coin,
        status: h.status,
        address: h.address,
        txId: h.txId,
        applyTime: h.applyTime,
        network: h.network,
        completeTime: h.completeTime,
        explorerUrl: getExplorerUrlForNetwork(h.network, h.txId)
      }));
    }

    cachedInfo = {
      status: statusRes.data?.data === 'Normal' ? 'CONNECTED_AND_AUTHENTICATED' : 'AUTHENTICATED',
      isConfigured: true,
      canRead,
      canWithdraw,
      ipRestricted,
      nonZeroBalances,
      withdrawalHistory,
      lastFetchedAt: new Date().toISOString()
    };
    lastFetchTime = now;
    return cachedInfo;
  } catch (err: any) {
    console.warn('[BinanceClient] Live sync warning:', err.message);
    return {
      status: 'API_ERROR',
      isConfigured: true,
      canRead: false,
      canWithdraw: false,
      ipRestricted: false,
      nonZeroBalances: [],
      withdrawalHistory: [],
      lastFetchedAt: new Date().toISOString()
    };
  }
}

export async function submitLiveBinanceWithdrawal(params: {
  coin: string;
  network: string;
  address: string;
  amount: number;
}): Promise<{
  success: boolean;
  orderId?: string;
  txId?: string;
  explorerUrl?: string;
  rawResponse?: any;
  error?: string;
  permissionNote?: string;
}> {
  const apiKey = process.env.BINANCE_API_KEY;
  const apiSecret = process.env.BINANCE_API_SECRET;

  if (!apiKey || !apiSecret) {
    return {
      success: false,
      error: 'Binance API credentials missing from environment.'
    };
  }

  // Pre-check restrictions
  const restrictions = await signedRequest('/sapi/v1/account/apiRestrictions');
  const canWithdraw = Boolean(restrictions.data?.enableWithdrawals);

  if (!canWithdraw) {
    return {
      success: false,
      error: 'BINANCE_WITHDRAWAL_RESTRICTED',
      permissionNote: 'The configured Binance API Key has enableWithdrawals: false (Standard Binance security policy). Programmatic withdrawals require enabling withdrawals and configuring an IP access whitelist on your Binance account.',
      rawResponse: restrictions.data
    };
  }

  // Submit withdrawal request to Binance capital API
  const res = await signedRequest('/sapi/v1/capital/withdraw/apply', 'POST', {
    coin: params.coin,
    network: params.network,
    address: params.address,
    amount: params.amount
  });

  if (res.status === 200 && res.data?.id) {
    return {
      success: true,
      orderId: res.data.id,
      rawResponse: res.data
    };
  }

  return {
    success: false,
    error: res.data?.msg || `Binance API error (Status ${res.status})`,
    rawResponse: res.data
  };
}
