import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Search, 
  DollarSign, 
  Calculator, 
  Sparkles, 
  ExternalLink, 
  Zap, 
  Cpu, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Plus,
  Clock,
  Briefcase
} from 'lucide-react';
import { Opportunity, PlatformType, AssetCategory, BusinessEngineType } from '../types';

interface OpportunityPipelineProps {
  opportunities: Opportunity[];
  onTriggerDeepAudit: (opportunity: Opportunity) => void;
  onAddCustomOpportunity?: (opp: Partial<Opportunity>) => void;
}

export const OpportunityPipeline: React.FC<OpportunityPipelineProps> = ({
  opportunities,
  onTriggerDeepAudit,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterEngine, setFilterEngine] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'PROFIT_HR' | 'ENV' | 'BOUNTY' | 'PROB'>('PROFIT_HR');
  const [sortOrder, setSortOrder] = useState<'DESC' | 'ASC'>('DESC');

  const filtered = opportunities
    .filter(opp => {
      const matchSearch = opp.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.assetUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (opp.pillarName && opp.pillarName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = filterCategory === 'ALL' || opp.assetCategory === filterCategory;
      const matchEngine = filterEngine === 'ALL' || opp.businessEngine === filterEngine;
      return matchSearch && matchCat && matchEngine;
    })
    .sort((a, b) => {
      let valA = sortBy === 'PROFIT_HR' ? (a.profitPerHour ?? a.expectedNetValue) :
                 sortBy === 'ENV' ? a.expectedNetValue :
                 sortBy === 'BOUNTY' ? a.maxBounty : a.acceptanceProb;
      let valB = sortBy === 'PROFIT_HR' ? (b.profitPerHour ?? b.expectedNetValue) :
                 sortBy === 'ENV' ? b.expectedNetValue :
                 sortBy === 'BOUNTY' ? b.maxBounty : b.acceptanceProb;
      return sortOrder === 'DESC' ? valB - valA : valA - valB;
    });

  const totalENV = opportunities.reduce((acc, o) => acc + (o.scopeStatus === 'AUTHORIZED' ? o.expectedNetValue : 0), 0);
  const totalNetProfit = opportunities.reduce((acc, o) => acc + (o.scopeStatus === 'AUTHORIZED' ? (o.expectedNetProfit ?? o.expectedNetValue) : 0), 0);

  return (
    <div className="space-y-4">
      
      {/* Top Header with Economic Formula Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-4 rounded-xl border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Calculator className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Autonomous Economic Opportunity Engine &bull; Multi-Factor Ranked
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Workforce priority queue automatically ranked across Expected Net Value, Profit/Hour, Compute, Duplicate Risk &amp; Authorization:
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
              <span className="text-emerald-400 font-semibold">Expected Net Profit (ENP)</span>
              <span className="text-slate-500">=</span>
              <span className="text-slate-300">(P(Accept) &times; (1 &minus; P(Dup)) &times; Reward)</span>
              <span className="text-slate-500">&minus;</span>
              <span className="text-rose-400">Compute Cost</span>
              <span className="text-slate-500">&minus;</span>
              <span className="text-rose-400">Human Cost</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400">Total Expected Net Profit</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                ${(totalNetProfit ?? 0).toLocaleString()}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400">Authorized Scopes</div>
              <div className="text-base font-bold font-mono text-white">
                {opportunities.filter(o => o.scopeStatus === 'AUTHORIZED').length} / {opportunities.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs, assets, pillars..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Category, Engine & Sorting Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <select
            value={filterEngine}
            onChange={(e) => setFilterEngine(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Business Engines</option>
            <option value="RESEARCH">Research Engine</option>
            <option value="SERVICES">Services Engine</option>
            <option value="SAAS">SaaS Engine</option>
            <option value="PLATFORM">Platform Engine</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="API">API Security</option>
            <option value="Web">Web Security</option>
            <option value="Cloud">Cloud &amp; Infra</option>
            <option value="AI System">AI Security</option>
            <option value="Web3">Web3 &amp; Smart Contracts</option>
            <option value="SaaS Platform">SaaS Platform</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>

          <button
            onClick={() => {
              if (sortBy === 'PROFIT_HR') setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC');
              else { setSortBy('PROFIT_HR'); setSortOrder('DESC'); }
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 border transition-colors ${
              sortBy === 'PROFIT_HR' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            Profit/Hr {sortBy === 'PROFIT_HR' && (sortOrder === 'DESC' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => {
              if (sortBy === 'ENV') setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC');
              else { setSortBy('ENV'); setSortOrder('DESC'); }
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 border transition-colors ${
              sortBy === 'ENV' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            ENV {sortBy === 'ENV' && (sortOrder === 'DESC' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => {
              if (sortBy === 'BOUNTY') setSortOrder(sortOrder === 'DESC' ? 'ASC' : 'DESC');
              else { setSortBy('BOUNTY'); setSortOrder('DESC'); }
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1 border transition-colors ${
              sortBy === 'BOUNTY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            Bounty {sortBy === 'BOUNTY' && (sortOrder === 'DESC' ? '↓' : '↑')}
          </button>
        </div>

      </div>

      {/* Opportunity Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Program &amp; Pillar</th>
                <th className="py-3 px-4">Asset Target</th>
                <th className="py-3 px-4">Engine &amp; Category</th>
                <th className="py-3 px-4 text-right">Gross Reward</th>
                <th className="py-3 px-4 text-center">P(Success)</th>
                <th className="py-3 px-4 text-right">Profit / Hr</th>
                <th className="py-3 px-4 text-right">Expected Net Profit</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((opp) => {
                const isBlocked = opp.scopeStatus === 'BLOCKED';
                const isPending = opp.scopeStatus === 'PENDING_VERIFICATION';

                return (
                  <tr 
                    key={opp.id} 
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isBlocked ? 'opacity-60 bg-rose-950/10' : ''
                    }`}
                  >
                    
                    {/* Program Name & Scope Gate */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-xs font-sans flex items-center gap-2">
                        {opp.programName}
                        {opp.pillarId && (
                          <span className="text-[9px] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-1 py-0.2 rounded font-mono">
                            #{opp.pillarId}
                          </span>
                        )}
                        {opp.safeHarborCertified && (
                          <span className="text-[9px] text-teal-400 bg-teal-500/10 border border-teal-500/30 px-1.5 py-0.5 rounded" title="Gold Safe Harbor Certified">
                            SafeHarbor
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                        {opp.scopeStatus === 'AUTHORIZED' ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" /> AUTHORIZED (ALLOW)
                          </span>
                        ) : isBlocked ? (
                          <span className="text-rose-400 flex items-center gap-1 font-semibold">
                            <ShieldX className="w-3.5 h-3.5" /> SCOPE EXCLUDED (BLOCK)
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1 font-semibold">
                            <ShieldAlert className="w-3.5 h-3.5" /> SCOPE UNCERTAIN (PAUSE)
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Asset Target */}
                    <td className="py-3.5 px-4 text-slate-300 max-w-[180px] truncate text-[11px]">
                      <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {opp.assetUrl}
                      </span>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{opp.timeRequiredHours ? `${opp.timeRequiredHours}h est` : '2h est'}</span>
                      </div>
                    </td>

                    {/* Engine & Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {opp.businessEngine ?? 'RESEARCH'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                        {opp.assetCategory}
                      </div>
                    </td>

                    {/* Max Bounty */}
                    <td className="py-3.5 px-4 text-right font-bold text-white">
                      ${(opp.expectedReward ?? opp.maxBounty ?? 0).toLocaleString()}
                    </td>

                    {/* Acceptance Probability */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                        {((opp.acceptanceProb ?? 0) * 100).toFixed(0)}%
                      </div>
                    </td>

                    {/* Profit / Hour */}
                    <td className="py-3.5 px-4 text-right">
                      {isBlocked ? (
                        <span className="text-slate-500">$0/hr</span>
                      ) : (
                        <span className="text-cyan-300 font-bold text-xs bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                          +${Math.round(opp.profitPerHour ?? (opp.expectedNetValue / 2)).toLocaleString()}/hr
                        </span>
                      )}
                    </td>

                    {/* Expected Net Profit */}
                    <td className="py-3.5 px-4 text-right">
                      {isBlocked ? (
                        <span className="text-slate-400">$0 (Blocked)</span>
                      ) : (
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                          +${Math.round(opp.expectedNetProfit ?? opp.expectedNetValue ?? 0).toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      {isBlocked ? (
                        <span className="text-[11px] text-rose-400 font-mono flex items-center justify-center gap-1">
                          <Lock className="w-3 h-3" /> Gate Locked
                        </span>
                      ) : (
                        <button
                          onClick={() => onTriggerDeepAudit(opp)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-sans font-semibold transition-all flex items-center justify-center gap-1 mx-auto active:scale-95 shadow-sm"
                          title="Deploy Autonomous Agents for Deep Vulnerability Audit"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          Deep Audit
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

