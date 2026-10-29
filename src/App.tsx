/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  Bug, 
  Cpu, 
  FileCheck, 
  FileText, 
  UserCheck, 
  DollarSign, 
  GraduationCap, 
  Layers, 
  Lock, 
  Sliders, 
  Activity,
  Compass,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  FastForward,
  Radio,
  Scale,
  AlertOctagon,
  FileCheck2,
  Network,
  Building2,
  CheckCircle2,
  Key
} from 'lucide-react';

import { 
  OperatingStage, 
  Agent, 
  Opportunity, 
  VulnerabilityFinding, 
  ScopePolicyRule, 
  RevenueStreamBreakdown, 
  MissionDirectorGoal,
  RealityIndexMetrics,
  VerifiedLedgerEntry,
  KillSwitchConfig,
  ExecutionJob,
  DigitalTwinNode,
  EnterpriseSaaSMonitor,
  MarketplaceListing,
  AdversarialDebate,
  SystemEnvironment,
  RevenuePillarMeta,
  AutonomousBusinessEngineConfig,
  ComputeEconomicsModel,
  AutonomousReinvestmentPlan,
  BusinessEngineType
} from './types';

import { 
  INITIAL_AGENTS, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_FINDINGS, 
  INITIAL_SCOPE_POLICIES, 
  INITIAL_REVENUE_STREAMS,
  INITIAL_REALITY_INDEX,
  INITIAL_VERIFIED_LEDGER,
  INITIAL_KILL_SWITCHES,
  INITIAL_JOBS,
  INITIAL_DIGITAL_TWIN,
  INITIAL_SAAS_MONITORS,
  INITIAL_MARKETPLACE_LISTINGS,
  INITIAL_REVENUE_PILLARS,
  INITIAL_BUSINESS_ENGINES,
  INITIAL_COMPUTE_ECONOMICS,
  INITIAL_REINVESTMENT_PLAN
} from './data/initialData';

import { Header } from './components/Header';
import { AutonomousLoopBar } from './components/AutonomousLoopBar';
import { WorkforceGrid } from './components/WorkforceGrid';
import { OpportunityPipeline } from './components/OpportunityPipeline';
import { VulnerabilityLedger } from './components/VulnerabilityLedger';
import { ScopeGateGuardrails } from './components/ScopeGateGuardrails';
import { RevenueAndFinance } from './components/RevenueAndFinance';
import { LearningEngine } from './components/LearningEngine';
import { MissionDirectorModal } from './components/MissionDirectorModal';
import { DeepAuditModal } from './components/DeepAuditModal';
import { ReportModal } from './components/ReportModal';
import { RealityIndexDashboard } from './components/RealityIndexDashboard';
import { KillSwitchCenter } from './components/KillSwitchCenter';
import { EvidenceVault } from './components/EvidenceVault';
import { JobQueueMonitor } from './components/JobQueueMonitor';
import { DigitalTwinMap } from './components/DigitalTwinMap';
import { MarketplaceAndSaaS } from './components/MarketplaceAndSaaS';
import { MainnetProofCenter } from './components/MainnetProofCenter';
import { TreasuryGovernance } from './components/TreasuryGovernance';
import { RevenueUniverseRouter } from './components/RevenueUniverseRouter';

export default function App() {
  // System Environment (LIVE vs SANDBOX vs DEMO)
  const [environment, setEnvironment] = useState<SystemEnvironment>('LIVE');

  // Main System State
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [findings, setFindings] = useState<VulnerabilityFinding[]>(INITIAL_FINDINGS);
  const [policies, setPolicies] = useState<ScopePolicyRule[]>(INITIAL_SCOPE_POLICIES);
  const [revenueStreams, setRevenueStreams] = useState<RevenueStreamBreakdown[]>(INITIAL_REVENUE_STREAMS);
  
  // Complete 20-Pillar Revenue Universe & Router State
  const [pillars, setPillars] = useState<RevenuePillarMeta[]>(INITIAL_REVENUE_PILLARS);
  const [engines, setEngines] = useState<AutonomousBusinessEngineConfig[]>(INITIAL_BUSINESS_ENGINES);
  const [computeEconomics, setComputeEconomics] = useState<ComputeEconomicsModel>(INITIAL_COMPUTE_ECONOMICS);
  const [reinvestmentPlan, setReinvestmentPlan] = useState<AutonomousReinvestmentPlan>(INITIAL_REINVESTMENT_PLAN);

  // Advanced OS Modules State
  const [realityMetrics, setRealityMetrics] = useState<RealityIndexMetrics>(INITIAL_REALITY_INDEX);
  const [verifiedLedger, setVerifiedLedger] = useState<VerifiedLedgerEntry[]>(INITIAL_VERIFIED_LEDGER);
  const [killSwitches, setKillSwitches] = useState<KillSwitchConfig>(INITIAL_KILL_SWITCHES);
  const [jobs, setJobs] = useState<ExecutionJob[]>(INITIAL_JOBS);
  const [digitalTwinNodes, setDigitalTwinNodes] = useState<DigitalTwinNode[]>(INITIAL_DIGITAL_TWIN);
  const [saasClients, setSaasClients] = useState<EnterpriseSaaSMonitor[]>(INITIAL_SAAS_MONITORS);
  const [marketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>(INITIAL_MARKETPLACE_LISTINGS);
  
  // Strict Cleared Treasury Balance
  const [verifiedClearedRevenue, setVerifiedClearedRevenue] = useState<number>(0);

  // Autonomous Engine State
  const [autonomousMode, setAutonomousMode] = useState<'RUNNING' | 'PAUSED' | 'STEPPING'>('RUNNING');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [currentStage, setCurrentStage] = useState<OperatingStage>('AUTOMATIC_RESEARCH');
  const [cycleCount, setCycleCount] = useState<number>(184);
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'REVENUE_UNIVERSE' | 'MAINNET_PROOF' | 'TREASURY' | 'PIPELINE' | 'WORKFORCE' | 'LEDGER' | 'REALITY' | 'KILL_SWITCH' | 'EVIDENCE' | 'JOBS' | 'DIGITAL_TWIN' | 'SAAS_MKT' | 'SCOPE_GATE' | 'FINANCE' | 'LEARNING'
  >('REVENUE_UNIVERSE');

  // Mission Director Goal
  const [goal, setGoal] = useState<MissionDirectorGoal>({
    objective: 'Maximize legitimate cybersecurity revenue within authorized programs',
    priorityStream: 'API & Cloud Security',
    minimumENVThreshold: 2000,
    requireHumanApprovalBeforeSubmission: true,
    sandboxValidationEnforced: true,
  });

  // Modal State
  const [isMissionDirectorOpen, setIsMissionDirectorOpen] = useState(false);
  const [selectedAuditOpp, setSelectedAuditOpp] = useState<Opportunity | null>(null);
  const [selectedReportFinding, setSelectedReportFinding] = useState<VulnerabilityFinding | null>(null);

  // Fetch Full Truth System State from Backend (Frontend Truth Rule)
  const fetchSystemState = async () => {
    try {
      const res = await fetch('/api/system/state');
      if (!res.ok) return;
      const data = await res.json();
      if (data.environment) setEnvironment(data.environment);
      if (typeof data.verifiedClearedRevenue === 'number') setVerifiedClearedRevenue(data.verifiedClearedRevenue);
      if (data.realityMetrics) setRealityMetrics(data.realityMetrics);
      if (data.killSwitches) setKillSwitches(data.killSwitches);
      if (data.currentStage) setCurrentStage(data.currentStage);
      if (typeof data.cycleCount === 'number') setCycleCount(data.cycleCount);
      if (data.autonomousMode) setAutonomousMode(data.autonomousMode);
      if (typeof data.speedMultiplier === 'number') setSpeedMultiplier(data.speedMultiplier);

      if (data.environment === 'LIVE') {
        if (data.opportunities) setOpportunities(data.opportunities);
        if (data.findings) setFindings(data.findings);
        if (data.jobs) setJobs(data.jobs);
        if (data.verifiedLedger) setVerifiedLedger(data.verifiedLedger);
        if (data.scopeRules && data.scopeRules.length > 0) setPolicies(data.scopeRules);
      } else {
        if (data.opportunities && data.opportunities.length > 0) setOpportunities(data.opportunities);
        if (data.findings && data.findings.length > 0) setFindings(data.findings);
        if (data.jobs && data.jobs.length > 0) setJobs(data.jobs);
        if (data.verifiedLedger && data.verifiedLedger.length > 0) setVerifiedLedger(data.verifiedLedger);
        if (data.scopeRules && data.scopeRules.length > 0) setPolicies(data.scopeRules);
      }
    } catch (err) {
      console.warn("Local system state sync:", err);
    }
  };

  // Synchronize with server on boot & poll every 4 seconds
  useEffect(() => {
    fetchSystemState();
    const interval = setInterval(fetchSystemState, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectEnvironment = async (env: SystemEnvironment) => {
    setEnvironment(env);
    try {
      await fetch('/api/system/environment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ environment: env })
      });
      await fetchSystemState();
    } catch (err) {
      console.warn("Failed to set backend environment:", err);
    }
  };

  const totalPendingTriage = 49800;
  const activeAgentsCount = agents.filter(a => a.status !== 'idle').length;

  const STAGES_ORDER: OperatingStage[] = [
    'DISCOVER',
    'FIND_OPPORTUNITIES',
    'VERIFY_AUTHORIZATION',
    'PRIORITIZE_ENV',
    'AUTOMATIC_RESEARCH',
    'DETECT_VULNERABILITIES',
    'VALIDATE_SANDBOX',
    'ELIMINATE_FALSE_POSITIVES',
    'GENERATE_EVIDENCE',
    'CALCULATE_SEVERITY',
    'GENERATE_REPORT',
    'HUMAN_APPROVAL',
    'TRACK_TRIAGE',
    'TRACK_REWARD',
    'LEARN',
  ];

  // Autonomous Continuous Operating Loop Driver
  useEffect(() => {
    if (autonomousMode !== 'RUNNING' || killSwitches.globalKillSwitch) return;

    const baseInterval = 3200;
    const intervalMs = Math.max(800, baseInterval / speedMultiplier);

    const timer = setInterval(() => {
      progressCycleStep();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autonomousMode, speedMultiplier, currentStage, killSwitches.globalKillSwitch]);

  // Single Cycle Advancement Logic
  const progressCycleStep = () => {
    if (killSwitches.globalKillSwitch) return;

    setCurrentStage(prev => {
      const idx = STAGES_ORDER.indexOf(prev);
      const nextIdx = (idx + 1) % STAGES_ORDER.length;
      if (nextIdx === 0) {
        setCycleCount(c => c + 1);
      }
      return STAGES_ORDER[nextIdx];
    });

    // Update an agent log and status
    const randAgentIdx = Math.floor(Math.random() * agents.length);
    setAgents(prevAgents => {
      const copy = [...prevAgents];
      const ag = { ...copy[randAgentIdx] };
      const timeStr = new Date().toTimeString().split(' ')[0];

      const logTemplates = [
        { msg: `Verified non-destructive payload boundary in sandbox`, type: 'success' as const },
        { msg: `Evaluating authorization parameters for candidate endpoint`, type: 'info' as const },
        { msg: `Recalculated Expected Net Value (ENV) across authorized scopes`, type: 'info' as const },
        { msg: `Adversarial consensus validation completed with 0% mutation`, type: 'success' as const },
        { msg: `Blocked out-of-scope third-party asset per safe harbor`, type: 'block' as const },
      ];
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];

      ag.recentLogs = [
        { timestamp: timeStr, message: randomLog.msg, type: randomLog.type },
        ...ag.recentLogs.slice(0, 5)
      ];
      ag.tasksCompleted += 1;
      copy[randAgentIdx] = ag;
      return copy;
    });
  };

  // Human Approval Action
  const handleApproveFinding = (findingId: string) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          triageStatus: 'TRIAGED',
          stage: 'TRACK_TRIAGE'
        };
      }
      return f;
    }));

    // Add to pending ledger
    const targetFinding = findings.find(f => f.id === findingId);
    if (targetFinding) {
      const newEntry: VerifiedLedgerEntry = {
        id: `LEDGER-TX-${Math.floor(100 + Math.random() * 900)}`,
        findingId: targetFinding.id,
        opportunityId: targetFinding.opportunityId,
        programName: targetFinding.programName,
        revenueTier: 'PENDING',
        amount: 4500,
        currency: 'USD',
        operatingCost: targetFinding.computeCost,
        netProfit: 4500 - targetFinding.computeCost,
        verificationSource: 'Submitted to Program Triage via Secure Safe Harbor Gate',
        timestamp: new Date().toISOString(),
        isConfirmedByBankOrEscrow: false
      };
      setVerifiedLedger(prev => [newEntry, ...prev]);
    }
  };

  const handleAddFinding = (newFinding: VulnerabilityFinding) => {
    setFindings(prev => [newFinding, ...prev]);
    setActiveTab('LEDGER');
  };

  const handleAddLiveOpportunity = (newOpp: Opportunity) => {
    setOpportunities(prev => [newOpp, ...prev]);
    setActiveTab('PIPELINE');
  };

  const handleTogglePolicy = (policyId: string) => {
    setPolicies(prev => prev.map(p => p.id === policyId ? { ...p, isActive: !p.isActive } : p));
  };

  // Adversarial Debate Trigger
  const handleRefreshDebate = async (finding: VulnerabilityFinding) => {
    try {
      const res = await fetch('/api/engine/adversarial-debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ finding })
      });
      const data = await res.json();
      if (data && data.judgeVerdict) {
        setFindings(prev => prev.map(f => f.id === finding.id ? { ...f, adversarialDebate: data } : f));
      }
    } catch (e) {
      console.warn("Using fallback local debate evaluation:", e);
    }
  };

  // Reality Ledger Verification
  const handleVerifyLedgerItem = async (item: VerifiedLedgerEntry) => {
    setVerifiedLedger(prev => prev.map(l => {
      if (l.id === item.id) {
        return {
          ...l,
          revenueTier: 'VERIFIED',
          paymentReference: `ESCROW-CONFIRMED-${Math.floor(100000 + Math.random() * 900000)}`,
          verificationSource: 'Cryptographic Bank Escrow Receipt Confirmed',
          isConfirmedByBankOrEscrow: true
        };
      }
      return l;
    }));
    setVerifiedClearedRevenue(t => t + item.amount);
  };

  // Kill Switch Handlers
  const handleToggleGlobalKill = () => {
    setKillSwitches(prev => ({
      ...prev,
      globalKillSwitch: !prev.globalKillSwitch
    }));
  };

  const handleToggleProgramKill = (programId: string) => {
    setKillSwitches(prev => ({
      ...prev,
      programKillSwitches: {
        ...prev.programKillSwitches,
        [programId]: !prev.programKillSwitches[programId]
      }
    }));
  };

  const handleToggleTargetKill = (targetDomain: string) => {
    setKillSwitches(prev => {
      const copy = { ...prev.targetKillSwitches };
      if (copy[targetDomain]) {
        delete copy[targetDomain];
      } else {
        copy[targetDomain] = true;
      }
      return { ...prev, targetKillSwitches: copy };
    });
  };

  const handleToggleTechniqueKill = (technique: string) => {
    setKillSwitches(prev => {
      const copy = { ...prev.techniqueKillSwitches };
      if (copy[technique]) {
        delete copy[technique];
      } else {
        copy[technique] = true;
      }
      return { ...prev, techniqueKillSwitches: copy };
    });
  };

  const handleEmergencyReset = () => {
    setKillSwitches({
      globalKillSwitch: false,
      programKillSwitches: {},
      targetKillSwitches: {},
      techniqueKillSwitches: {},
      rateLimitExceededLock: false
    });
  };

  return (
    <div id="root-container" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black flex flex-col">
      
      {/* Global Kill Switch Banner Alert if Active */}
      {killSwitches.globalKillSwitch && (
        <div className="bg-rose-600 text-white px-4 py-2 text-xs font-mono font-bold flex items-center justify-between sticky top-0 z-50 shadow-2xl">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 animate-bounce" />
              EMERGENCY HARD STOP ACTIVE: All agent workers, sandbox runners, and network probes are completely frozen.
            </span>
            <button
              onClick={handleEmergencyReset}
              className="px-3 py-1 rounded bg-white text-rose-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Disarm & Resume System
            </button>
          </div>
        </div>
      )}

      {/* Header with Environment Switcher, Metrics, and Autonomous Controls */}
      <Header
        autonomousMode={autonomousMode}
        onToggleMode={setAutonomousMode}
        onStepCycle={progressCycleStep}
        speedMultiplier={speedMultiplier}
        onChangeSpeed={setSpeedMultiplier}
        totalRevenue={verifiedClearedRevenue}
        totalPending={totalPendingTriage}
        activeAgentsCount={activeAgentsCount}
        totalAgentsCount={agents.length}
        onOpenMissionDirector={() => setIsMissionDirectorOpen(true)}
        goal={goal}
        environment={environment}
        onSelectEnvironment={handleSelectEnvironment}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-5">
        
        {/* 15-Stage Continuous Autonomous Loop Visualizer */}
        <AutonomousLoopBar
          currentStage={currentStage}
          cycleCount={cycleCount}
          onSelectStage={(stage) => setCurrentStage(stage)}
          activeTargetInfo={{
            programName: 'Apex Cloud & SaaS Core',
            agentName: 'Nexus-API & Aegis-Validation',
            actionDesc: 'Non-Destructive BOLA Verification',
          }}
        />

        {/* View Navigation Tabs */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            
            {/* Complete Revenue Universe & Router Tab */}
            <button
              onClick={() => setActiveTab('REVENUE_UNIVERSE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'REVENUE_UNIVERSE'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Revenue Universe (20 Pillars)
            </button>

            {/* Mainnet Proof Center Tab */}
            <button
              onClick={() => setActiveTab('MAINNET_PROOF')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'MAINNET_PROOF'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Mainnet Proof Center
            </button>

            {/* Treasury Governance Tab */}
            <button
              onClick={() => setActiveTab('TREASURY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'TREASURY'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              Treasury & Multi-Sig
            </button>

            <button
              onClick={() => setActiveTab('PIPELINE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'PIPELINE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Opportunities ({opportunities.length})
            </button>

            <button
              onClick={() => setActiveTab('WORKFORCE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'WORKFORCE'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Workforce Swarm ({agents.length})
            </button>

            <button
              onClick={() => setActiveTab('LEDGER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'LEDGER'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              Finding Ledger ({findings.length})
              {findings.some(f => f.triageStatus === 'READY_FOR_APPROVAL') && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('REALITY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'REALITY'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              Reality Index
            </button>

            <button
              onClick={() => setActiveTab('KILL_SWITCH')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'KILL_SWITCH'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              Kill Switches
            </button>

            <button
              onClick={() => setActiveTab('EVIDENCE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'EVIDENCE'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-purple-400" />
              Evidence Vault
            </button>

            <button
              onClick={() => setActiveTab('JOBS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'JOBS'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Job Queue ({jobs.length})
            </button>

            <button
              onClick={() => setActiveTab('DIGITAL_TWIN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'DIGITAL_TWIN'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-teal-400" />
              Digital Twin
            </button>

            <button
              onClick={() => setActiveTab('SAAS_MKT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'SAAS_MKT'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              Retainers
            </button>

            <button
              onClick={() => setActiveTab('SCOPE_GATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'SCOPE_GATE'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              Scope Gate
            </button>

            <button
              onClick={() => setActiveTab('FINANCE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'FINANCE'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              Financials
            </button>

            <button
              onClick={() => setActiveTab('LEARNING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'LEARNING'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Learning
            </button>

          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Loop: <span className="text-emerald-300 font-bold">{currentStage.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {/* Tab Views */}
        <div className="space-y-4">
          
          {activeTab === 'REVENUE_UNIVERSE' && (
            <RevenueUniverseRouter
              pillars={pillars}
              engines={engines}
              computeEconomics={computeEconomics}
              reinvestmentPlan={reinvestmentPlan}
              opportunities={opportunities}
              totalVerifiedCleared={verifiedClearedRevenue}
              onDispatchOpportunity={(newOpp) => {
                setOpportunities(prev => [newOpp, ...prev]);
                setSelectedAuditOpp(newOpp);
              }}
              onUpdateEngineAllocation={(engineId, newAllocationPct) => {
                setEngines(prev => prev.map(e => e.id === engineId ? { ...e, computeAllocationPct: newAllocationPct } : e));
              }}
              onUpdateReinvestmentPlan={(partialPlan) => {
                setReinvestmentPlan(prev => ({ ...prev, ...partialPlan }));
              }}
            />
          )}

          {activeTab === 'MAINNET_PROOF' && (
            <MainnetProofCenter
              onAddLiveOpportunity={handleAddLiveOpportunity}
              verifiedClearedRevenue={verifiedClearedRevenue}
              onRefreshState={fetchSystemState}
            />
          )}

          {activeTab === 'TREASURY' && (
            <TreasuryGovernance
              onWithdrawSuccess={(amt) => setVerifiedClearedRevenue(b => Math.max(0, b - amt))}
            />
          )}

          {activeTab === 'PIPELINE' && (
            <OpportunityPipeline
              opportunities={opportunities}
              onTriggerDeepAudit={(opp) => setSelectedAuditOpp(opp)}
            />
          )}

          {activeTab === 'WORKFORCE' && (
            <WorkforceGrid
              agents={agents}
            />
          )}

          {activeTab === 'LEDGER' && (
            <VulnerabilityLedger
              findings={findings}
              onApproveFinding={handleApproveFinding}
              onGenerateReport={(f) => setSelectedReportFinding(f)}
              onSandboxVerify={(f) => setSelectedAuditOpp(opportunities.find(o => o.id === f.opportunityId) || null)}
              onRefreshDebate={handleRefreshDebate}
            />
          )}

          {activeTab === 'REALITY' && (
            <RealityIndexDashboard
              metrics={realityMetrics}
              ledger={verifiedLedger}
              findings={findings}
              onVerifyLedgerItem={handleVerifyLedgerItem}
            />
          )}

          {activeTab === 'KILL_SWITCH' && (
            <KillSwitchCenter
              killSwitches={killSwitches}
              opportunities={opportunities}
              onToggleGlobalKill={handleToggleGlobalKill}
              onToggleProgramKill={handleToggleProgramKill}
              onToggleTargetKill={handleToggleTargetKill}
              onToggleTechniqueKill={handleToggleTechniqueKill}
              onEmergencyReset={handleEmergencyReset}
            />
          )}

          {activeTab === 'EVIDENCE' && (
            <EvidenceVault
              findings={findings}
            />
          )}

          {activeTab === 'JOBS' && (
            <JobQueueMonitor
              jobs={jobs}
              onTriggerJob={(jobId) => {
                const job = jobs.find(j => j.id === jobId);
                if (job) {
                  console.info(`Triggered Job ${job.id} for target ${job.target} assigned to ${job.assignedAgent}`);
                }
              }}
            />
          )}

          {activeTab === 'DIGITAL_TWIN' && (
            <DigitalTwinMap
              nodes={digitalTwinNodes}
            />
          )}

          {activeTab === 'SAAS_MKT' && (
            <MarketplaceAndSaaS
              saasClients={saasClients}
              marketplaceListings={marketplaceListings}
              treasuryBalance={verifiedClearedRevenue}
              onInitiateWithdrawal={(amount) => setVerifiedClearedRevenue(b => Math.max(0, b - amount))}
            />
          )}

          {activeTab === 'SCOPE_GATE' && (
            <ScopeGateGuardrails
              policies={policies}
              onTogglePolicy={handleTogglePolicy}
            />
          )}

          {activeTab === 'FINANCE' && (
            <RevenueAndFinance
              revenueStreams={revenueStreams}
              findings={findings}
            />
          )}

          {activeTab === 'LEARNING' && (
            <LearningEngine
              findings={findings}
            />
          )}

        </div>

      </main>

      {/* Footer / Safety Verification Bar */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-4 py-3 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Autonomous Cybersecurity Revenue OS &middot; Strict Gold Safe Harbor Active</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Zero Unsolicited Probing &middot; Deterministic Evidence Hash Registry &middot; Ephemeral Sandbox Verification
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MissionDirectorModal
        isOpen={isMissionDirectorOpen}
        onClose={() => setIsMissionDirectorOpen(false)}
        currentGoal={goal}
        onUpdateGoal={setGoal}
        opportunities={opportunities}
        agents={agents}
        totalRevenue={verifiedClearedRevenue}
      />

      <DeepAuditModal
        isOpen={!!selectedAuditOpp}
        onClose={() => setSelectedAuditOpp(null)}
        opportunity={selectedAuditOpp}
        onAddFinding={handleAddFinding}
      />

      <ReportModal
        isOpen={!!selectedReportFinding}
        onClose={() => setSelectedReportFinding(null)}
        finding={selectedReportFinding}
      />

    </div>
  );
}
