import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Play, 
  RefreshCw,
  Clock,
  Terminal,
  FileCheck2
} from 'lucide-react';
import { AdversarialDebate, VulnerabilityFinding } from '../types';

interface AdversarialDebateViewerProps {
  finding: VulnerabilityFinding;
  onClose?: () => void;
  onRefreshDebate?: (finding: VulnerabilityFinding) => Promise<void>;
}

export const AdversarialDebateViewer: React.FC<AdversarialDebateViewerProps> = ({
  finding,
  onClose,
  onRefreshDebate
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const debate = finding.adversarialDebate;

  const handleRunDebate = async () => {
    if (!onRefreshDebate) return;
    setIsRunning(true);
    try {
      await onRefreshDebate(finding);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-4 shadow-xl text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Adversarial Validation Swarm
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                Red vs Blue + Judge AI
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Pits offensive proof against defensive challenge before human submission.
            </p>
          </div>
        </div>

        {onRefreshDebate && (
          <button
            onClick={handleRunDebate}
            disabled={isRunning}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Re-Evaluate Debate</span>
          </button>
        )}
      </div>

      {/* Target & Finding Info */}
      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-emerald-400 font-bold">{finding.id} &middot; {finding.programName}</span>
          <span className="text-slate-400">{finding.severity} ({finding.cvssScore})</span>
        </div>
        <div className="text-slate-200 font-sans font-bold text-xs">{finding.title}</div>
        <div className="text-[11px] text-slate-400 truncate">{finding.target}</div>
      </div>

      {debate ? (
        <div className="space-y-3">
          
          {/* Red Team vs Blue Team Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            {/* Red Team Claim */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Red Team Offensive Claim</span>
              </div>
              <p className="text-slate-200 font-sans leading-relaxed text-[11px]">
                {debate.redTeamClaim}
              </p>
              <div className="p-2 bg-slate-950 rounded border border-rose-950 text-[10px] font-mono text-rose-300">
                <span className="text-slate-500 block">Proof Vector:</span>
                {debate.redTeamProof}
              </div>
            </div>

            {/* Blue Team Challenge */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Blue Team Defense Challenge</span>
              </div>
              <p className="text-slate-200 font-sans leading-relaxed text-[11px]">
                {debate.blueTeamChallenge}
              </p>
              <div className="p-2 bg-slate-950 rounded border border-cyan-950 text-[10px] font-mono text-cyan-300">
                <span className="text-slate-500 block">Mitigation Check:</span>
                {debate.blueTeamMitigationCheck}
              </div>
            </div>

          </div>

          {/* Themis-Judge Verdict Card */}
          <div className={`p-4 rounded-xl border space-y-2 font-mono ${
            debate.judgeVerdict === 'PASS' ? 'bg-emerald-950/30 border-emerald-500/40' :
            debate.judgeVerdict === 'FAIL' ? 'bg-rose-950/30 border-rose-500/40' :
            'bg-amber-950/30 border-amber-500/40'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs">
                <Scale className="w-4 h-4 text-purple-400" />
                <span className="text-white">THEMIS-JUDGE VERDICT:</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  debate.judgeVerdict === 'PASS' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  debate.judgeVerdict === 'FAIL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {debate.judgeVerdict}
                </span>
              </div>
              <div className="text-slate-300 font-bold text-xs">
                Confidence: {(debate.judgeConfidenceScore * 100).toFixed(0)}%
              </div>
            </div>

            <p className="text-slate-200 font-sans text-xs leading-relaxed pt-1 border-t border-slate-800/80">
              {debate.judgeRationale}
            </p>

            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
              <span>Timestamp: {new Date(debate.timestamp).toLocaleTimeString()}</span>
              <span>Deterministic Multi-Agent Consensus</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <Scale className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-xs">No adversarial debate record generated yet for this finding.</p>
          {onRefreshDebate && (
            <button
              onClick={handleRunDebate}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all text-xs"
            >
              Run Adversarial Validation Now
            </button>
          )}
        </div>
      )}

      {onClose && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close Inspector
          </button>
        </div>
      )}

    </div>
  );
};
