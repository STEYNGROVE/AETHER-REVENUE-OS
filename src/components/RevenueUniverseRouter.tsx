import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Cpu, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Calculator, 
  Building2, 
  Briefcase, 
  Repeat, 
  Server, 
  Database, 
  Terminal, 
  Sliders, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  BarChart3, 
  Award, 
  ChevronRight,
  BookOpen,
  Share2,
  HardDrive,
  ShieldAlert,
  Percent,
  Play
} from 'lucide-react';
import { 
  RevenuePillarMeta, 
  AutonomousBusinessEngineConfig, 
  ComputeEconomicsModel, 
  AutonomousReinvestmentPlan, 
  Opportunity, 
  BusinessEngineType 
} from '../types';

interface RevenueUniverseRouterProps {
  pillars: RevenuePillarMeta[];
  engines: AutonomousBusinessEngineConfig[];
  computeEconomics: ComputeEconomicsModel;
  reinvestmentPlan: AutonomousReinvestmentPlan;
  opportunities: Opportunity[];
  totalVerifiedCleared: number;
  onDispatchOpportunity: (opp: Opportunity) => void;
  onUpdateEngineAllocation: (engineId: BusinessEngineType, newAllocationPct: number) => void;
  onUpdateReinvestmentPlan: (plan: Partial<AutonomousReinvestmentPlan>) => void;
}

export const RevenueUniverseRouter: React.FC<RevenueUniverseRouterProps> = ({
  pillars,
  engines,
  computeEconomics,
  reinvestmentPlan,
  opportunities,
  totalVerifiedCleared,
  onDispatchOpportunity,
  onUpdateEngineAllocation,
  onUpdateReinvestmentPlan,
}) => {
  const [activeSubView, setActiveSubView] = useState<'ROUTER' | 'PILLARS_20' | 'ENGINES_4' | 'SCORER_SIM' | 'COMPUTE_ECON' | 'REINVESTMENT'>('ROUTER');
  const [selectedEngineFilter, setSelectedEngineFilter] = useState<string>('ALL');
  const [searchPillarQuery, setSearchPillarQuery] = useState<string>('');
  const [selectedPillarModal, setSelectedPillarModal] = useState<RevenuePillarMeta | null>(null);

  // Multi-Factor Simulator State
  const [simName, setSimName] = useState('Enterprise Zero-Trust API & IAM Assessment');
  const [simCategory, setSimCategory] = useState<BusinessEngineType>('SERVICES');
  const [simPillarId, setSimPillarId] = useState<number>(2);
  const [simExpectedReward, setSimExpectedReward] = useState<number>(14000);
  const [simProbSuccess, setSimProbSuccess] = useState<number>(0.92);
  const [simTimeRequiredHours, setSimTimeRequiredHours] = useState<number>(5.5);
  const [simComputeCost, setSimComputeCost] = useState<number>(28.50);
  const [simHumanReviewCost, setSimHumanReviewCost] = useState<number>(120.00);
  const [simDuplicateProb, setSimDuplicateProb] = useState<number>(0.03);
  const [simRisk, setSimRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [simCompetition, setSimCompetition] = useState<'LOW' | 'MODERATE' | 'HIGH' | 'CROWDED'>('LOW');

  // Multi-Factor Scoring Calculation
  // Expected Net Profit = (ProbSuccess * (1 - DuplicateProb) * ExpectedReward) - ComputeCost - HumanReviewCost
  const effectiveProb = simProbSuccess * (1 - simDuplicateProb);
  const simExpectedNetProfit = Math.max(0, (effectiveProb * simExpectedReward) - simComputeCost - simHumanReviewCost);
  const simProfitPerHour = simTimeRequiredHours > 0 ? simExpectedNetProfit / simTimeRequiredHours : 0;

  // Aggregate stats across 20 pillars
  const totalUniverseRevenue = pillars.reduce((acc, p) => acc + (p.totalGeneratedRevenue || 0), 0);
  const totalProjectedARR = pillars.reduce((acc, p) => acc + (p.projectedAnnualRunRate || 0), 0);
  const averageMargin = Math.round(pillars.reduce((acc, p) => acc + (p.averageProfitMarginPct || 0), 0) / (pillars.length || 1));

  // Filtered pillars
  const filteredPillars = pillars.filter(p => {
    const matchEngine = selectedEngineFilter === 'ALL' || p.engine === selectedEngineFilter;
    const matchSearch = p.name.toLowerCase().includes(searchPillarQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchPillarQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchPillarQuery.toLowerCase()) ||
                        p.primaryMechanisms.some(m => m.toLowerCase().includes(searchPillarQuery.toLowerCase()));
    return matchEngine && matchSearch;
  });

  return (
    <div id="revenue-universe-container" className="space-y-4">
      {/* PRIME DIRECTIVE BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 p-4 rounded-xl border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Network className="w-4 h-4" />
              </span>
              <h1 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                Cyber OS &mdash; Complete Revenue Universe &amp; Router
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                20 Revenue Pillars Active
              </span>
            </div>
            <div className="mt-2 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans max-w-4xl">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px] mb-1 font-mono">
                [ PRIME MISSION DIRECTIVE ]
              </span>
              &ldquo;Continuously identify the highest-value legitimate cybersecurity, research, service, SaaS and marketplace opportunities available to this organization; verify authorization and commercial legitimacy; allocate resources according to expected net value; execute permitted work autonomously; prove every outcome; collect only legitimately earned revenue; and continuously optimize the portfolio.&rdquo;
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono">
            <div className="p-2 bg-slate-900/60 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase block">Universe ARR Run Rate</span>
              <span className="text-sm font-black text-emerald-400">
                ${(totalProjectedARR ?? 0).toLocaleString()}/yr
              </span>
            </div>
            <div className="p-2 bg-slate-900/60 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase block">Verified Generated</span>
              <span className="text-sm font-black text-white">
                ${(totalUniverseRevenue ?? 0).toLocaleString()}
              </span>
            </div>
            <div className="p-2 bg-slate-900/60 rounded-lg col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase block">Avg Operating Margin</span>
              <span className="text-sm font-black text-cyan-300">
                {averageMargin}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION SUB-TABS */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-x-auto scrollbar-none">
        <button
          id="tab-router-topology"
          onClick={() => setActiveSubView('ROUTER')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'ROUTER' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Revenue Router Topology</span>
        </button>

        <button
          id="tab-pillars-20"
          onClick={() => setActiveSubView('PILLARS_20')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'PILLARS_20' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Complete 20 Pillars Directory</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300">20</span>
        </button>

        <button
          id="tab-engines-4"
          onClick={() => setActiveSubView('ENGINES_4')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'ENGINES_4' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>3+1 Autonomous Business Engines</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800">4</span>
        </button>

        <button
          id="tab-scorer-sim"
          onClick={() => setActiveSubView('SCORER_SIM')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'SCORER_SIM' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Multi-Factor Opportunity Scorer</span>
        </button>

        <button
          id="tab-compute-econ"
          onClick={() => setActiveSubView('COMPUTE_ECON')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'COMPUTE_ECON' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Compute Marketplace Yield</span>
        </button>

        <button
          id="tab-reinvestment"
          onClick={() => setActiveSubView('REINVESTMENT')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubView === 'REINVESTMENT' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Profit Reinvestment Engine</span>
        </button>
      </div>

      {/* VIEW 1: REVENUE ROUTER TOPOLOGY FLOWCHART */}
      {activeSubView === 'ROUTER' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-400" />
                  Autonomous Revenue Router Flowchart
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dynamic capital &amp; compute allocation routing across all authorized revenue divisions
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  Routing State: <span className="text-emerald-400 font-bold">AUTONOMOUS OPTIMIZING</span>
                </span>
              </div>
            </div>

            {/* INTERACTIVE ROUTER TOPOLOGY CANVAS */}
            <div className="mt-6 flex flex-col items-center gap-4 py-2">
              
              {/* TOP NODE: CYBER OS */}
              <div className="p-3 bg-gradient-to-r from-emerald-950 to-slate-900 rounded-xl border border-emerald-500/40 text-center shadow-lg w-72">
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider font-bold">SOVEREIGN CORE</div>
                <div className="text-sm font-black text-white">CYBER OS &bull; AUTONOMOUS BRAIN</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Continuous Scope &amp; Legitimacy Verification</div>
              </div>

              {/* DOWN ARROW */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-emerald-500 to-amber-500"></div>

              {/* LEVEL 2: OPPORTUNITY ENGINE & MULTI-FACTOR SCORER */}
              <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/40 text-center shadow-md w-84">
                <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-bold">MULTI-FACTOR INGESTION</div>
                <div className="text-sm font-bold text-white">OPPORTUNITY &amp; ECONOMIC SCORING ENGINE</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  ENV = (P(Success) &times; (1 &minus; P(Dup)) &times; Reward) &minus; Compute &minus; Human
                </div>
              </div>

              {/* DOWN ARROW SPLIT */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-amber-500 to-cyan-500"></div>

              {/* LEVEL 3: 4 AUTONOMOUS BUSINESS ENGINES */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full max-w-5xl">
                {engines.map(engine => {
                  const borderColor = 
                    engine.id === 'RESEARCH' ? 'border-amber-500/30 hover:border-amber-500' :
                    engine.id === 'SERVICES' ? 'border-sky-500/30 hover:border-sky-500' :
                    engine.id === 'SAAS' ? 'border-emerald-500/30 hover:border-emerald-500' :
                    'border-purple-500/30 hover:border-purple-500';

                  const badgeColor =
                    engine.id === 'RESEARCH' ? 'bg-amber-500/10 text-amber-300' :
                    engine.id === 'SERVICES' ? 'bg-sky-500/10 text-sky-300' :
                    engine.id === 'SAAS' ? 'bg-emerald-500/10 text-emerald-300' :
                    'bg-purple-500/10 text-purple-300';

                  return (
                    <div key={engine.id} className={`p-3.5 bg-slate-950 rounded-xl border ${borderColor} transition-all shadow-sm flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${badgeColor}`}>
                            {engine.codename}
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">
                            {engine.computeAllocationPct}% Compute
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-2">{engine.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">{engine.tagline}</p>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t border-slate-850 text-right font-mono">
                        <span className="text-[9px] text-slate-500 block uppercase">Projected ARR</span>
                        <span className="text-xs font-bold text-emerald-300">${engine.projectedAnnualRunRate.toLocaleString()}/yr</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DOWN ARROW */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"></div>

              {/* LEVEL 4: SPECIALIZED DIVISIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-purple-400 font-mono font-bold uppercase">DIVISION A</div>
                  <div className="text-xs font-bold text-white">AI Security &amp; LLM Red Team</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Prompt Injection &bull; RAG Bounds &bull; Agent Tools</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-sky-400 font-mono font-bold uppercase">DIVISION B</div>
                  <div className="text-xs font-bold text-white">Web3 &amp; Smart Contracts</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Formal Invariants &bull; DeFi Audits &bull; Fuzzing</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase">DIVISION C</div>
                  <div className="text-xs font-bold text-white">Cloud &amp; Mobile Infrastructure</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Kubernetes IAM &bull; APK Audits &bull; Microservices</div>
                </div>
              </div>

              {/* DOWN ARROW */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-purple-500 to-emerald-500"></div>

              {/* LEVEL 5: TREASURY & ESCROW SETTLEMENT */}
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 text-center shadow-md w-84">
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider font-bold">SETTLEMENT ESCROW</div>
                <div className="text-sm font-bold text-white">2-OF-3 MULTI-SIG TREASURY &amp; ESCROW</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  Strict Bank ACH &bull; Stripe Connect &bull; On-Chain Verification
                </div>
              </div>

              {/* DOWN ARROW */}
              <div className="h-6 w-0.5 bg-emerald-500"></div>

              {/* LEVEL 6: PROFIT REINVESTMENT ENGINE */}
              <div className="p-3.5 bg-gradient-to-r from-slate-900 to-emerald-950/40 rounded-xl border border-emerald-500/30 text-center shadow-lg w-full max-w-xl">
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider font-bold">AUTONOMOUS COMPOUNDING</div>
                <div className="text-sm font-black text-white">PROFIT REINVESTMENT &amp; WORKFORCE EXPANSION ENGINE</div>
                <div className="grid grid-cols-4 gap-2 mt-2 font-mono text-[10px]">
                  <div className="p-1 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400 block">40% Compute</span>
                    <span className="text-emerald-400 font-bold">High-ENV</span>
                  </div>
                  <div className="p-1 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400 block">25% Hold</span>
                    <span className="text-amber-300 font-bold">Treasury Reserve</span>
                  </div>
                  <div className="p-1 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400 block">20% Infra</span>
                    <span className="text-cyan-300 font-bold">Sandboxes</span>
                  </div>
                  <div className="p-1 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400 block">15% Models</span>
                    <span className="text-purple-300 font-bold">Fine-Tuning</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: THE 20 PILLARS DIRECTORY */}
      {activeSubView === 'PILLARS_20' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchPillarQuery}
                onChange={(e) => setSearchPillarQuery(e.target.value)}
                placeholder="Search across 20 revenue pillars..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Engine Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-mono">Engine:</span>
              {(['ALL', 'RESEARCH', 'SERVICES', 'SAAS', 'PLATFORM'] as const).map(eng => (
                <button
                  key={eng}
                  onClick={() => setSelectedEngineFilter(eng)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    selectedEngineFilter === eng
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {eng}
                </button>
              ))}
            </div>
          </div>

          {/* GRID OF 20 PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredPillars.map(pillar => {
              const engineBadgeColor = 
                pillar.engine === 'RESEARCH' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                pillar.engine === 'SERVICES' ? 'bg-sky-500/10 text-sky-300 border-sky-500/20' :
                pillar.engine === 'SAAS' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                'bg-purple-500/10 text-purple-300 border-purple-500/20';

              const predictColor = 
                pillar.predictabilityTier === 'HIGH_RECURRING' ? 'text-emerald-400' :
                pillar.predictabilityTier === 'MEDIUM_STABLE' ? 'text-sky-300' :
                'text-amber-300';

              return (
                <div 
                  key={pillar.id}
                  id={`pillar-card-${pillar.id}`}
                  className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        PILLAR #{pillar.id}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${engineBadgeColor}`}>
                        {pillar.engine}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-2">{pillar.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pillar.description}</p>

                    <div className="mt-3 space-y-1.5">
                      <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold">Primary Monetization Mechanisms:</div>
                      <div className="flex flex-wrap gap-1">
                        {pillar.primaryMechanisms.map((mech, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-[10px] text-slate-300 font-mono">
                            {mech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Predictability:</span>
                      <span className={`font-semibold ${predictColor}`}>
                        {pillar.predictabilityTier.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Projected Run Rate:</span>
                      <span className="font-bold text-emerald-400">
                        ${pillar.projectedAnnualRunRate.toLocaleString()}/yr
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Operating Margin:</span>
                      <span className="font-bold text-cyan-300">
                        {pillar.averageProfitMarginPct}%
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setSelectedPillarModal(pillar)}
                        className="w-full py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 transition-all flex items-center justify-center gap-1"
                      >
                        <span>View Pillar Safeguards &amp; SOW Scope</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: 3+1 AUTONOMOUS BUSINESS ENGINES */}
      {activeSubView === 'ENGINES_4' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {engines.map(engine => {
              const borderTheme = 
                engine.id === 'RESEARCH' ? 'border-amber-500/30' :
                engine.id === 'SERVICES' ? 'border-sky-500/30' :
                engine.id === 'SAAS' ? 'border-emerald-500/30' :
                'border-purple-500/30';

              return (
                <div key={engine.id} id={`engine-card-${engine.id}`} className={`bg-slate-900 p-5 rounded-xl border ${borderTheme} shadow-md space-y-4`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400">
                          {engine.codename}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                          {engine.activeStatus}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1.5">{engine.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{engine.tagline}</p>
                    </div>
                  </div>

                  {/* FINANCIAL RUN RATE & ESCROW */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-center">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Cleared Revenue</span>
                      <span className="text-sm font-bold text-white">${engine.verifiedClearedRevenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Pending Escrow</span>
                      <span className="text-sm font-bold text-amber-300">${engine.pendingEscrow.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Projected ARR</span>
                      <span className="text-sm font-bold text-emerald-400">${engine.projectedAnnualRunRate.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* PILLARS COVERED */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Pillars Orchestrated by this Engine:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {engine.pillarsCovered.map(pid => {
                        const p = pillars.find(x => x.id === pid);
                        return (
                          <span key={pid} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono">
                            #{pid} {p ? p.name : ''}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* KEY METRICS & ASSIGNED AGENTS */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Assigned Workforce</span>
                      <span className="text-slate-200 text-[11px]">{engine.activeAgentsAssigned.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Allocation Control</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="range"
                          min="5"
                          max="60"
                          step="5"
                          value={engine.computeAllocationPct}
                          onChange={(e) => onUpdateEngineAllocation(engine.id, parseInt(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <span className="text-emerald-400 font-bold">{engine.computeAllocationPct}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: MULTI-FACTOR OPPORTUNITY SCORER */}
      {activeSubView === 'SCORER_SIM' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  Multi-Factor Opportunity Scoring Engine
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulate or score any opportunity against the 9-dimensional economic algorithm
                </p>
              </div>
              <div className="px-3 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                Formula: ENV = [P(Success) &times; (1 &minus; P(Dup)) &times; Reward] &minus; Compute &minus; Human
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
              {/* INPUT CONTROLS */}
              <div className="lg:col-span-2 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Opportunity Title</label>
                    <input
                      type="text"
                      value={simName}
                      onChange={(e) => setSimName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Revenue Pillar</label>
                    <select
                      value={simPillarId}
                      onChange={(e) => {
                        const pid = parseInt(e.target.value);
                        setSimPillarId(pid);
                        const p = pillars.find(x => x.id === pid);
                        if (p) setSimCategory(p.engine);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none mt-1"
                    >
                      {pillars.map(p => (
                        <option key={p.id} value={p.id}>
                          #{p.id} &bull; {p.name} ({p.engine})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Expected Gross Reward ($)</label>
                    <input
                      type="number"
                      value={simExpectedReward}
                      onChange={(e) => setSimExpectedReward(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Probability of Success (0 - 1.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={simProbSuccess}
                      onChange={(e) => setSimProbSuccess(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-cyan-300 focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Time Required (Hours)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={simTimeRequiredHours}
                      onChange={(e) => setSimTimeRequiredHours(parseFloat(e.target.value) || 0.1)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Compute Cost ($)</label>
                    <input
                      type="number"
                      step="1"
                      value={simComputeCost}
                      onChange={(e) => setSimComputeCost(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-rose-400 focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Human Cost / Review ($)</label>
                    <input
                      type="number"
                      step="5"
                      value={simHumanReviewCost}
                      onChange={(e) => setSimHumanReviewCost(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-rose-400 focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">P(Duplicate Collision)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={simDuplicateProb}
                      onChange={(e) => setSimDuplicateProb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-amber-300 focus:border-emerald-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Risk Level</label>
                    <select
                      value={simRisk}
                      onChange={(e: any) => setSimRisk(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none mt-1"
                    >
                      <option value="LOW">LOW &bull; Standard Safe Harbor Verified</option>
                      <option value="MEDIUM">MEDIUM &bull; Elevated Scope Boundaries</option>
                      <option value="HIGH">HIGH &bull; Strict Human Gate Required</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-mono block">Competition Level</label>
                    <select
                      value={simCompetition}
                      onChange={(e: any) => setSimCompetition(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none mt-1"
                    >
                      <option value="LOW">LOW &bull; Private Exclusive Scope</option>
                      <option value="MODERATE">MODERATE &bull; Vetted Researcher Pool</option>
                      <option value="HIGH">HIGH &bull; Public Leaderboard</option>
                      <option value="CROWDED">CROWDED &bull; High Collision Risk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* CALCULATION SUMMARY CARD */}
              <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-5 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">SCORECARD OUTPUT</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                      {simProfitPerHour > 1000 ? 'TIER-1 ALPHA' : simProfitPerHour > 300 ? 'TIER-2 STABLE' : 'TIER-3 MODERATE'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Expected Net Profit</span>
                      <div className="text-2xl font-black font-mono text-emerald-400 mt-0.5">
                        ${simExpectedNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Expected Profit / Hour</span>
                      <div className="text-2xl font-black font-mono text-cyan-300 mt-0.5">
                        ${simProfitPerHour.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span className="text-xs text-slate-400">/hr</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] font-mono text-slate-400 pt-1">
                      <div className="flex justify-between">
                        <span>Effective Probability:</span>
                        <span className="text-white font-bold">{(effectiveProb * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Overhead (Compute + Review):</span>
                        <span className="text-rose-400 font-bold">${(simComputeCost + simHumanReviewCost).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      const newOpp: Opportunity = {
                        id: `opp-sim-${Date.now()}`,
                        programName: simName,
                        platform: 'Enterprise Consulting',
                        assetUrl: `https://${simName.toLowerCase().replace(/\s+/g, '-')}.authorized.sec`,
                        assetCategory: 'API',
                        scopeStatus: 'AUTHORIZED',
                        maxBounty: simExpectedReward * 1.5,
                        expectedReward: simExpectedReward,
                        acceptanceProb: simProbSuccess,
                        estimatedResearchCost: simComputeCost + simHumanReviewCost,
                        expectedNetValue: simExpectedNetProfit,
                        timeRequiredHours: simTimeRequiredHours,
                        computeCost: simComputeCost,
                        humanReviewCost: simHumanReviewCost,
                        riskScore: simRisk,
                        competitionLevel: simCompetition,
                        duplicateProbability: simDuplicateProb,
                        expectedNetProfit: simExpectedNetProfit,
                        profitPerHour: simProfitPerHour,
                        pillarId: simPillarId as any,
                        businessEngine: simCategory,
                        pillarName: pillars.find(p => p.id === simPillarId)?.name || 'Custom Pillar',
                        commercialLegitimacyVerified: true,
                        testingWindow: '24/7 Monitored',
                        rateLimitMaxReqSec: 10,
                        authorizedTechniques: ['Authorized SOW Testing', 'Sandboxed API Verification'],
                        prohibitedTechniques: ['DoS', 'Destructive Payload'],
                        safeHarborCertified: true,
                        safeHarborTier: 'Gold',
                        createdAt: new Date().toISOString(),
                        lastUpdated: new Date().toISOString()
                      };
                      onDispatchOpportunity(newOpp);
                    }}
                    className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Dispatch to Autonomous Workforce</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: COMPUTE & RESOURCE MARKETPLACE ECONOMICS */}
      {activeSubView === 'COMPUTE_ECON' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  Compute / Resource Marketplace Economics
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verifiable Net Return Equation: Yield &minus; (Electricity + Hardware Depreciation + Bandwidth + AI Costs)
                </p>
              </div>
              <div className="px-3 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                Efficiency Ratio: {computeEconomics.efficiencyRatio}x
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {/* COST BREAKDOWN */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Hourly Compute Expense Deductions
                </h4>
                
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                    <span className="text-slate-400">1. Electricity Cost:</span>
                    <span className="text-rose-400 font-bold">${computeEconomics.electricityCostPerHour.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                    <span className="text-slate-400">2. Hardware Depreciation:</span>
                    <span className="text-rose-400 font-bold">${computeEconomics.hardwareDepreciationPerHour.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                    <span className="text-slate-400">3. Bandwidth / Egress:</span>
                    <span className="text-rose-400 font-bold">${computeEconomics.bandwidthCostPerHour.toFixed(2)}/hr</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                    <span className="text-slate-400">4. AI Token Inference:</span>
                    <span className="text-rose-400 font-bold">${computeEconomics.aiInferenceCostPerHour.toFixed(2)}/hr</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex justify-between items-center font-mono">
                  <span className="text-xs text-slate-300 font-bold">Total Operating Cost:</span>
                  <span className="text-sm font-bold text-rose-400">
                    ${(computeEconomics.electricityCostPerHour + computeEconomics.hardwareDepreciationPerHour + computeEconomics.bandwidthCostPerHour + computeEconomics.aiInferenceCostPerHour).toFixed(2)}/hr
                  </span>
                </div>
              </div>

              {/* MARKETPLACE REVENUE YIELD & NET PROFIT */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Marketplace Yield &amp; Arbitrage
                  </h4>
                  
                  <div className="mt-3 space-y-3 font-mono">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Monetized Marketplace Yield</span>
                      <span className="text-xl font-black text-emerald-400 mt-0.5 block">
                        ${computeEconomics.monetizedMarketplaceYieldPerHour.toFixed(2)}/hr
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/40">
                      <span className="text-[10px] text-emerald-400 uppercase block font-bold">Actual Net Return / Hour</span>
                      <span className="text-2xl font-black text-cyan-300 mt-0.5 block">
                        +${computeEconomics.netHourlyReturn.toFixed(2)}/hr
                      </span>
                      <p className="text-[10px] text-slate-400 font-sans mt-1">
                        Calculated dynamically across idle capacity in sovereign compute clusters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-center font-mono text-xs text-emerald-300">
                  ✓ Autonomous Resource Arbitrage Active &bull; Zero Idle Loss
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: PROFIT REINVESTMENT ENGINE */}
      {activeSubView === 'REINVESTMENT' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-emerald-400" />
                  Autonomous Profit Reinvestment &amp; Portfolio Optimization
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated distribution rule applied to every verified treasury settlement
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Total Cleared Treasury:</span>
                <span className="text-emerald-400 font-bold">${totalVerifiedCleared.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              
              {/* REINVESTMENT TIER 1 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">40% ALLOCATION</span>
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white">High-ENV Research Compute</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Funds top-ranked API, Cloud, and Web3 fuzzing workloads with verified &gt;85% acceptance probability.
                </p>
                <div className="pt-2 font-mono text-xs text-emerald-300 font-bold">
                  ${(totalVerifiedCleared * 0.4).toLocaleString()} Allocated
                </div>
              </div>

              {/* REINVESTMENT TIER 2 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300">25% ALLOCATION</span>
                  <Lock className="w-4 h-4 text-amber-300" />
                </div>
                <h4 className="text-sm font-bold text-white">Treasury Cold Reserve</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Locked in 2-of-3 multi-sig hardware escrow for long-term balance sheet stability and insurance backing.
                </p>
                <div className="pt-2 font-mono text-xs text-amber-300 font-bold">
                  ${(totalVerifiedCleared * 0.25).toLocaleString()} Allocated
                </div>
              </div>

              {/* REINVESTMENT TIER 3 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">20% ALLOCATION</span>
                  <Server className="w-4 h-4 text-cyan-300" />
                </div>
                <h4 className="text-sm font-bold text-white">Sandbox Infrastructure</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Expands ephemeral container clusters, non-destructive test replica instances, and proof recorders.
                </p>
                <div className="pt-2 font-mono text-xs text-cyan-300 font-bold">
                  ${(totalVerifiedCleared * 0.2).toLocaleString()} Allocated
                </div>
              </div>

              {/* REINVESTMENT TIER 4 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-300">15% ALLOCATION</span>
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
                <h4 className="text-sm font-bold text-white">Models &amp; Intelligence Feeds</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Finances domain-specific security model fine-tuning, CVE feeds, and real-time advisory ingestions.
                </p>
                <div className="pt-2 font-mono text-xs text-purple-300 font-bold">
                  ${(totalVerifiedCleared * 0.15).toLocaleString()} Allocated
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PILLAR DETAILS MODAL */}
      {selectedPillarModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-emerald-400">
                    PILLAR #{selectedPillarModal.id}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    {selectedPillarModal.engine} ENGINE
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{selectedPillarModal.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedPillarModal.category}</p>
              </div>
              <button
                onClick={() => setSelectedPillarModal(null)}
                className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Description</span>
                <p className="text-slate-200 mt-1 leading-relaxed">{selectedPillarModal.description}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold block">Legal Safety &amp; SOW Baseline</span>
                <p className="text-emerald-300 mt-1 leading-relaxed font-mono text-[11px]">{selectedPillarModal.legalSafetyBaseline}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Projected Annual Run Rate</span>
                  <span className="text-sm font-bold text-emerald-400">${selectedPillarModal.projectedAnnualRunRate.toLocaleString()}/yr</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Average Profit Margin</span>
                  <span className="text-sm font-bold text-cyan-300">{selectedPillarModal.averageProfitMarginPct}%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPillarModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
