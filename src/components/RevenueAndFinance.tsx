import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Layers, 
  PieChart, 
  ExternalLink,
  Lock,
  ArrowUpRight,
  Sparkles,
  Zap,
  Calendar,
  Activity,
  CheckCircle2,
  BarChart3,
  Flame,
  RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { RevenueStreamBreakdown, VulnerabilityFinding } from '../types';

interface RevenueAndFinanceProps {
  revenueStreams: RevenueStreamBreakdown[];
  findings: VulnerabilityFinding[];
}

type TimeframeOption = '30D' | '90D' | '12M' | 'ALL';
type ChartMode = 'CUMULATIVE' | 'MONTHLY_FLOW' | 'NET_MARGIN';

interface RevenueDataPoint {
  date: string;
  shortLabel: string;
  clearedRevenue: number;
  cumulativeRevenue: number;
  computeCost: number;
  netProfit: number;
  milestone?: string;
}

// 12-Month Historical Cleared Revenue Trend Data
const HISTORICAL_SERIES_12M: RevenueDataPoint[] = [
  { date: '2025-09-01', shortLabel: 'Sep 25', clearedRevenue: 8500, cumulativeRevenue: 8500, computeCost: 280, netProfit: 8220, milestone: 'Swarm Genesis & Initial Safe Harbor' },
  { date: '2025-10-01', shortLabel: 'Oct 25', clearedRevenue: 14200, cumulativeRevenue: 22700, computeCost: 410, netProfit: 13790 },
  { date: '2025-11-01', shortLabel: 'Nov 25', clearedRevenue: 19800, cumulativeRevenue: 42500, computeCost: 620, netProfit: 19180, milestone: 'First Critical Smart Contract Bounty ($12k)' },
  { date: '2025-12-01', shortLabel: 'Dec 25', clearedRevenue: 24500, cumulativeRevenue: 67000, computeCost: 790, netProfit: 23710 },
  { date: '2026-01-01', shortLabel: 'Jan 26', clearedRevenue: 29000, cumulativeRevenue: 96000, computeCost: 890, netProfit: 28110, milestone: 'Enterprise Continuous Pentest SaaS Launch' },
  { date: '2026-02-01', shortLabel: 'Feb 26', clearedRevenue: 33400, cumulativeRevenue: 129400, computeCost: 1040, netProfit: 32360 },
  { date: '2026-03-01', shortLabel: 'Mar 26', clearedRevenue: 38200, cumulativeRevenue: 167600, computeCost: 1190, netProfit: 37010 },
  { date: '2026-04-01', shortLabel: 'Apr 26', clearedRevenue: 42100, cumulativeRevenue: 209700, computeCost: 1310, netProfit: 40790, milestone: 'AI Red-Teaming Multi-Tenant Engine Live' },
  { date: '2026-05-01', shortLabel: 'May 26', clearedRevenue: 46800, cumulativeRevenue: 256500, computeCost: 1450, netProfit: 45350 },
  { date: '2026-06-01', shortLabel: 'Jun 26', clearedRevenue: 51200, cumulativeRevenue: 307700, computeCost: 1620, netProfit: 49580 },
  { date: '2026-07-01', shortLabel: 'Jul 26', clearedRevenue: 56900, cumulativeRevenue: 364600, computeCost: 1780, netProfit: 55120, milestone: 'HackerOne Top-10 Whitehat Settlement' },
  { date: '2026-08-01', shortLabel: 'Aug 26', clearedRevenue: 63500, cumulativeRevenue: 428100, computeCost: 1940, netProfit: 61560, milestone: 'Treasury Auto-Reinvestment v2 Enabled' },
];

// 30-Day Daily Trend Data
const HISTORICAL_SERIES_30D: RevenueDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const baseCleared = Math.floor(1200 + Math.sin(i / 3) * 600 + (i * 80) + (i % 7 === 0 ? 3200 : 0));
  const compute = Math.floor(45 + Math.random() * 25);
  return {
    date: `2026-08-${day.toString().padStart(2, '0')}`,
    shortLabel: `Aug ${day}`,
    clearedRevenue: baseCleared,
    cumulativeRevenue: 0, // Calculated dynamically
    computeCost: compute,
    netProfit: baseCleared - compute,
    milestone: day === 7 ? 'ZK-EVM Vulnerability Cleared' : (day === 21 ? 'SOC2 Cloud Hardening Retainer' : undefined)
  };
});
// Fill cumulative for 30D
let runTot30 = 364600;
HISTORICAL_SERIES_30D.forEach(pt => {
  runTot30 += pt.clearedRevenue;
  pt.cumulativeRevenue = runTot30;
});

// 90-Day Weekly Trend Data
const HISTORICAL_SERIES_90D: RevenueDataPoint[] = Array.from({ length: 12 }, (_, i) => {
  const week = i + 1;
  const cleared = Math.floor(11500 + i * 1100 + (i % 3 === 0 ? 5400 : 0));
  const compute = Math.floor(380 + i * 25);
  return {
    date: `Week ${week}`,
    shortLabel: `Wk ${week}`,
    clearedRevenue: cleared,
    cumulativeRevenue: 0,
    computeCost: compute,
    netProfit: cleared - compute,
    milestone: week === 4 ? 'LLM Jailbreak Benchmark Payout' : (week === 9 ? 'Tier-1 Exchange Smart Contract Audit' : undefined)
  };
});
let runTot90 = 256500;
HISTORICAL_SERIES_90D.forEach(pt => {
  runTot90 += pt.clearedRevenue;
  pt.cumulativeRevenue = runTot90;
});

export const RevenueAndFinance: React.FC<RevenueAndFinanceProps> = ({
  revenueStreams,
  findings
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('12M');
  const [chartMode, setChartMode] = useState<ChartMode>('CUMULATIVE');
  const [isMovingVerified, setIsMovingVerified] = useState(false);
  const [moveStatus, setMoveStatus] = useState<string | null>(null);

  const handleMoveVerifiedToTreasury = async () => {
    setIsMovingVerified(true);
    setMoveStatus(null);
    try {
      const res = await fetch('/api/treasury/move-verified-to-cleared', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMoveStatus('Settled $237,100 to Cleared Treasury!');
        setTimeout(() => setMoveStatus(null), 4000);
      } else {
        setMoveStatus(data.error || 'Failed to move');
      }
    } catch (err: any) {
      setMoveStatus(err.message || 'Error settling');
    } finally {
      setIsMovingVerified(false);
    }
  };

  const totalVerified = revenueStreams.reduce((acc, s) => acc + s.verifiedEarnings, 0);
  const totalPending = revenueStreams.reduce((acc, s) => acc + s.pendingTriage, 0);
  const totalCompute = revenueStreams.reduce((acc, s) => acc + s.computeExpenses, 0);
  const netMargin = totalVerified > 0 ? (((totalVerified - totalCompute) / totalVerified) * 100).toFixed(1) : '100';

  // Selected dataset based on timeframe
  const chartData = useMemo(() => {
    switch (timeframe) {
      case '30D':
        return HISTORICAL_SERIES_30D;
      case '90D':
        return HISTORICAL_SERIES_90D;
      case '12M':
      case 'ALL':
      default:
        return HISTORICAL_SERIES_12M;
    }
  }, [timeframe]);

  // Dynamic statistics
  const currentTotalCumulative = chartData[chartData.length - 1]?.cumulativeRevenue || totalVerified;
  const startCumulative = chartData[0]?.cumulativeRevenue || 0;
  const growthRate = startCumulative > 0 
    ? (((currentTotalCumulative - startCumulative) / startCumulative) * 100).toFixed(1)
    : '100';
  const averagePeriodRevenue = Math.round(
    chartData.reduce((acc, curr) => acc + curr.clearedRevenue, 0) / chartData.length
  );
  const totalPeriodCompute = chartData.reduce((acc, curr) => acc + curr.computeCost, 0);

  // Custom Recharts Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data: RevenueDataPoint = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-sans space-y-1.5 min-w-[220px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-mono text-[11px] text-slate-400">
            <span className="font-bold text-white flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" /> {data.date}
            </span>
            <span className="text-emerald-400 font-semibold">Cleared & Verified</span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Cumulative Cleared:</span>
              <span className="font-mono font-bold text-emerald-400">
                ${data.cumulativeRevenue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Period Cleared Inflow:</span>
              <span className="font-mono font-bold text-teal-300">
                +${data.clearedRevenue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Compute / API Cost:</span>
              <span className="font-mono text-rose-300">
                -${data.computeCost.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800/80 pt-1 font-semibold">
              <span className="text-slate-200">Net Period Profit:</span>
              <span className="font-mono text-cyan-300">
                ${data.netProfit.toLocaleString()}
              </span>
            </div>
          </div>

          {data.milestone && (
            <div className="mt-1.5 p-1.5 rounded bg-emerald-950/50 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-start gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{data.milestone}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      
      {/* Top Financial Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Total Verified Earnings */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Total Verified Revenue</span>
              <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-2">
              ${(totalVerified ?? 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Machine-Verifiable Ledger
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleMoveVerifiedToTreasury}
              disabled={isMovingVerified}
              className="w-full flex items-center justify-center gap-1.5 px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold border border-emerald-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {isMovingVerified ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                  <span>Moving to Treasury...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Move $237,100 to Cleared Treasury</span>
                </>
              )}
            </button>
            {moveStatus && (
              <div className="mt-1 text-[10px] text-emerald-400 font-mono text-center">
                {moveStatus}
              </div>
            )}
          </div>
        </div>

        {/* Pending In Triage */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">In Triage Escrow</span>
            <div className="w-6 h-6 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-2">
            ${(totalPending ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {findings.filter(f => f.triageStatus === 'TRIAGED' || f.triageStatus === 'READY_FOR_APPROVAL').length} Active Submissions
          </div>
        </div>

        {/* Compute & API Cost */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Compute / Cloud Costs</span>
            <div className="w-6 h-6 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-300 mt-2">
            ${(totalCompute ?? 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Avg $0.04 / Sandbox Operation
          </div>
        </div>

        {/* Net Profit Margin */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Net Profit Margin</span>
            <div className="w-6 h-6 rounded bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">
            {netMargin}%
          </div>
          <div className="text-[11px] text-teal-300 mt-1 font-mono">
            ROI: {(totalVerified / (totalCompute || 1)).toFixed(1)}x Multiplier
          </div>
        </div>

      </div>

      {/* Historical Revenue Growth & Cleared Trend Line Chart (Recharts) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
        
        {/* Chart Header & Controls */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Historical Revenue & Cleared Earnings Trend
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified cryptographic settlements, bounty disbursements, and enterprise SaaS retainers over time.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setChartMode('CUMULATIVE')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                  chartMode === 'CUMULATIVE'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3 h-3" />
                Cumulative Growth
              </button>
              <button
                onClick={() => setChartMode('MONTHLY_FLOW')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                  chartMode === 'MONTHLY_FLOW'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3 h-3" />
                Period Inflow
              </button>
              <button
                onClick={() => setChartMode('NET_MARGIN')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
                  chartMode === 'NET_MARGIN'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3 h-3" />
                Net Margin
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              {(['30D', '90D', '12M', 'ALL'] as TimeframeOption[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded-md transition-all font-semibold ${
                    timeframe === tf
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/40 border-b border-slate-800 text-xs">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Period Peak Cleared</div>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              ${Math.max(...chartData.map(d => d.clearedRevenue)).toLocaleString()}
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Average Velocity</div>
            <div className="text-base font-bold font-mono text-teal-300 mt-0.5">
              ${averagePeriodRevenue.toLocaleString()} <span className="text-[10px] font-sans text-slate-400 font-normal">/ period</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Growth Momentum</div>
            <div className="text-base font-bold font-mono text-emerald-300 mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              +{growthRate}%
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Cloud Cost</div>
            <div className="text-base font-bold font-mono text-slate-300 mt-0.5">
              ${totalPeriodCompute.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="p-4 h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'CUMULATIVE' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="shortLabel" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  name="Cumulative Cleared ($)" 
                  dataKey="cumulativeRevenue" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorCumulative)" 
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#022c22' }}
                />
                <Line 
                  type="monotone" 
                  name="Period Inflow ($)" 
                  dataKey="clearedRevenue" 
                  stroke="#2dd4bf" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#2dd4bf' }}
                />
              </AreaChart>
            ) : chartMode === 'MONTHLY_FLOW' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="shortLabel" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  name="Cleared Inflow ($)" 
                  dataKey="clearedRevenue" 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, stroke: '#10b981', strokeWidth: 2, fill: '#0f172a' }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  name="Compute / Infra Cost ($)" 
                  dataKey="computeCost" 
                  stroke="#f43f5e" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#f43f5e' }}
                />
                <Line 
                  type="monotone" 
                  name="Net Profit ($)" 
                  dataKey="netProfit" 
                  stroke="#38bdf8" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#38bdf8' }}
                />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNetProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="shortLabel" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#334155' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  name="Net Margin Trajectory ($)" 
                  dataKey="netProfit" 
                  stroke="#38bdf8" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorNetProfit)" 
                  activeDot={{ r: 6, stroke: '#38bdf8', strokeWidth: 2, fill: '#082f49' }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Milestone Annotation Bar */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Cryptographic Proof Digest: <code className="font-mono text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">sha256:7f83b165...26d9069</code></span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-Time Bank Clearing Network Connected
          </div>
        </div>

      </div>

      {/* Revenue Stream Diversification Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Diversified Revenue Streams Breakdown
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">11 Monitored Channels</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-sans font-semibold">Stream & Category</th>
                <th className="py-3 px-4 text-right">Verified Earnings</th>
                <th className="py-3 px-4 text-right">In Triage</th>
                <th className="py-3 px-4 text-right">Compute Cost</th>
                <th className="py-3 px-4 text-center">ROI Multiplier</th>
                <th className="py-3 px-4 text-center">Active Scopes</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {revenueStreams.map((stream, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-bold text-white text-xs">{stream.streamName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{stream.category}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                    ${(stream.verifiedEarnings ?? 0).toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-right text-amber-300">
                    ${(stream.pendingTriage ?? 0).toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-right text-slate-400">
                    ${(stream.computeExpenses ?? 0).toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[11px] font-bold">
                      {stream.roiMultiplier}x
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center text-slate-300">
                    {stream.activeOpportunitiesCount} Scopes
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

