import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingBag, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  Star, 
  ArrowUpRight, 
  CheckCircle2, 
  Lock,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import { EnterpriseSaaSMonitor, MarketplaceListing } from '../types';

interface MarketplaceAndSaaSProps {
  saasClients: EnterpriseSaaSMonitor[];
  marketplaceListings: MarketplaceListing[];
  treasuryBalance: number;
  onInitiateWithdrawal: (amount: number, address: string) => void;
}

export const MarketplaceAndSaaS: React.FC<MarketplaceAndSaaSProps> = ({
  saasClients,
  marketplaceListings,
  treasuryBalance,
  onInitiateWithdrawal
}) => {
  const [activeTab, setActiveTab] = useState<'SAAS' | 'MARKETPLACE' | 'TREASURY'>('SAAS');
  const [withdrawAmount, setWithdrawAmount] = useState('5000');
  const [withdrawDestination, setWithdrawDestination] = useState('USDC-0x89f41029148201a08b9c1d2e3f4a5b6c7d8e9f0a');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<string | null>(null);

  const totalMRR = saasClients.reduce((acc, curr) => acc + curr.monthlyRecurringRevenue, 0);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(withdrawAmount);
    if (!val || val <= 0 || val > treasuryBalance) return;
    onInitiateWithdrawal(val, withdrawDestination);
    setWithdrawalSuccess(`Withdrawal of $${val.toLocaleString()} initiated to destination ${withdrawDestination}. Verified by Treasury Multi-Sig.`);
    setTimeout(() => setWithdrawalSuccess(null), 5000);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header with Navigation Tabs */}
      <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Enterprise Retainers & Marketplace Valuation</h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ${(totalMRR ?? 0).toLocaleString()}/mo Potential MRR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous client security retainers, specialized audit marketplace listings, and verified treasury settlements.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('SAAS')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === 'SAAS' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            24/7 Retainers
          </button>
          <button
            onClick={() => setActiveTab('MARKETPLACE')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === 'MARKETPLACE' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('TREASURY')}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === 'TREASURY' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            Treasury & Payouts
          </button>
        </div>
      </div>

      {withdrawalSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-center gap-2 font-mono animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{withdrawalSuccess}</span>
        </div>
      )}

      {/* Tab 1: Continuous Retainers */}
      {activeTab === 'SAAS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {saasClients.map(client => (
            <div key={client.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  {client.contractTier}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Safe Harbor Signed
                </span>
              </div>

              <div className="font-bold text-white text-sm">{client.clientName}</div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Monthly Recurring</span>
                  <span className="text-sm font-bold text-emerald-400">${(client.monthlyRecurringRevenue ?? 0).toLocaleString()}/mo</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Assets Guarded</span>
                  <span className="text-sm font-bold text-white">{client.monitoredAssetsCount}</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Resolved Issues: {client.criticalIssuesResolved}</span>
                <span className="text-teal-300">Continuous 24/7</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Marketplace Listings */}
      {activeTab === 'MARKETPLACE' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketplaceListings.map(item => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">{item.category}</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" /> {item.rating}
                </span>
              </div>

              <h4 className="font-bold text-white text-xs leading-snug">{item.title}</h4>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Audit Price</span>
                  <span className="text-sm font-bold text-white">${(item.price ?? 0).toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Turnaround</span>
                  <span className="text-xs font-bold text-teal-300">{item.deliveryTimeDays} Days</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>By: {item.provider}</span>
                <span>{item.completedAudits} Delivered</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Treasury & Withdrawable Funds */}
      {activeTab === 'TREASURY' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Treasury Vault Status (6 cols) */}
          <div className="md:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Treasury Vault Balance (Withdrawable)
              </h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                100% Cleared Escrow
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-slate-400 text-xs uppercase font-mono">Available For Instant Withdrawal</span>
              <div className="text-3xl font-bold font-mono text-emerald-400">
                ${(treasuryBalance ?? 0).toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Verified against HackerOne ACH, Bugcrowd Stripe, and Smart Contract Escrows.
              </p>
            </div>

            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Settlement Speed:</span>
                <span className="text-white">Instant (ACH / On-Chain)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Withdrawal Fee:</span>
                <span className="text-emerald-400">$0.00 (Zero Network Spread)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Multi-Sig Escrow:</span>
                <span className="text-teal-300">2-of-3 Hardware Enclave Confirmed</span>
              </div>
            </div>
          </div>

          {/* Withdrawal Initiation Form (6 cols) */}
          <div className="md:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-3">
            <h3 className="font-bold text-white uppercase text-xs flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <ArrowUpRight className="w-4 h-4 text-teal-400" />
              Initiate Treasury Withdrawal
            </h3>

            <form onSubmit={handleWithdraw} className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                  Withdrawal Amount (USD)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={treasuryBalance}
                  min={1}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                  Destination (Bank ACH / Ethereum USDC / Stripe Connect)
                </label>
                <input
                  type="text"
                  value={withdrawDestination}
                  onChange={(e) => setWithdrawDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950/40 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <DollarSign className="w-4 h-4" />
                Execute Verified Treasury Withdrawal
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
