import React from 'react';
import { 
  Radar, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  Code, 
  Bug, 
  Cpu, 
  FilterX, 
  FileCheck, 
  Calculator, 
  FileText, 
  UserCheck, 
  GitPullRequest, 
  Award, 
  GraduationCap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { OperatingStage } from '../types';

interface AutonomousLoopBarProps {
  currentStage: OperatingStage;
  cycleCount: number;
  onSelectStage?: (stage: OperatingStage) => void;
  activeTargetInfo?: { programName: string; actionDesc: string; agentName: string };
}

const STAGES: { id: OperatingStage; label: string; icon: any; short: string; color: string }[] = [
  { id: 'DISCOVER', label: 'Discover', short: 'DISC', icon: Radar, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  { id: 'FIND_OPPORTUNITIES', label: 'Find Opportunities', short: 'OPP', icon: Search, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  { id: 'VERIFY_AUTHORIZATION', label: 'Verify Scope', short: 'SCOPE', icon: ShieldCheck, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { id: 'PRIORITIZE_ENV', label: 'Score ENV', short: 'ENV', icon: TrendingUp, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { id: 'AUTOMATIC_RESEARCH', label: 'Auto Research', short: 'RSCH', icon: Code, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10' },
  { id: 'DETECT_VULNERABILITIES', label: 'Detect Bugs', short: 'DET', icon: Bug, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
  { id: 'VALIDATE_SANDBOX', label: 'Sandbox Validate', short: 'SAND', icon: Cpu, color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' },
  { id: 'ELIMINATE_FALSE_POSITIVES', label: 'Eliminate FP', short: 'NO-FP', icon: FilterX, color: 'text-rose-400 border-rose-500/40 bg-rose-500/10' },
  { id: 'GENERATE_EVIDENCE', label: 'Generate Evidence', short: 'EVID', icon: FileCheck, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { id: 'CALCULATE_SEVERITY', label: 'CVSS Severity', short: 'CVSS', icon: Calculator, color: 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10' },
  { id: 'GENERATE_REPORT', label: 'Gen Report', short: 'REP', icon: FileText, color: 'text-sky-400 border-sky-500/40 bg-sky-500/10' },
  { id: 'HUMAN_APPROVAL', label: 'Approval / Submit', short: 'GATE', icon: UserCheck, color: 'text-orange-400 border-orange-500/40 bg-orange-500/10' },
  { id: 'TRACK_TRIAGE', label: 'Track Triage', short: 'TRI', icon: GitPullRequest, color: 'text-pink-400 border-pink-500/40 bg-pink-500/10' },
  { id: 'TRACK_REWARD', label: 'Track Reward', short: 'REW', icon: Award, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { id: 'LEARN', label: 'Learn & Repeat', short: 'LEARN', icon: GraduationCap, color: 'text-violet-400 border-violet-500/40 bg-violet-500/10' }
];

export const AutonomousLoopBar: React.FC<AutonomousLoopBarProps> = ({
  currentStage,
  cycleCount,
  onSelectStage,
  activeTargetInfo
}) => {
  const currentIndex = STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-md">
      
      {/* Header Info & Cycle Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-semibold border border-emerald-500/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            LOOP CYCLE #{cycleCount}
          </div>
          <span className="text-xs text-slate-400">Autonomous Operating Pipeline</span>
        </div>

        {activeTargetInfo && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Active Task:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">
              {activeTargetInfo.agentName} &rarr; {activeTargetInfo.actionDesc}
            </span>
          </div>
        )}
      </div>

      {/* 15-Stage Horizontal Scrollable Track */}
      <div className="relative overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <div className="flex items-center gap-1 min-w-[1020px]">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = stage.id === currentStage;
            const isCompleted = idx < currentIndex;
            const isPending = idx > currentIndex;

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => onSelectStage && onSelectStage(stage.id)}
                  className={`group relative flex-1 flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center min-w-[62px] ${
                    isActive
                      ? `${stage.color} ring-2 ring-emerald-400/50 shadow-lg scale-105 z-10 font-bold`
                      : isCompleted
                      ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:text-slate-300'
                  }`}
                  title={`${stage.label} (Step ${idx + 1}/15)`}
                >
                  {/* Glowing active pip */}
                  {isActive && (
                    <span className="absolute -top-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                  )}

                  <Icon className={`w-4 h-4 mb-1 ${isActive ? 'animate-bounce' : isCompleted ? 'text-slate-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] uppercase font-mono tracking-tight truncate max-w-[58px]">
                    {stage.short}
                  </span>
                </button>

                {idx < STAGES.length - 1 && (
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${idx < currentIndex ? 'text-slate-600' : 'text-slate-800'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

    </div>
  );
};
