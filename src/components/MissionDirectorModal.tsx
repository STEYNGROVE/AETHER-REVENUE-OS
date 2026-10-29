import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  X, 
  Send, 
  Cpu, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Bot,
  RefreshCw,
  Sliders,
  Play
} from 'lucide-react';
import { MissionDirectorGoal, Opportunity, Agent } from '../types';

interface MissionDirectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: MissionDirectorGoal;
  onUpdateGoal: (goal: MissionDirectorGoal) => void;
  opportunities: Opportunity[];
  agents: Agent[];
  totalRevenue: number;
}

export const MissionDirectorModal: React.FC<MissionDirectorModalProps> = ({
  isOpen,
  onClose,
  currentGoal,
  onUpdateGoal,
  opportunities,
  agents,
  totalRevenue,
}) => {
  const [objectiveInput, setObjectiveInput] = useState(currentGoal.objective);
  const [minENV, setMinENV] = useState(currentGoal.minimumENVThreshold);
  const [requireHumanGate, setRequireHumanGate] = useState(currentGoal.requireHumanApprovalBeforeSubmission);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    strategicSummary: string;
    allocations: { agentId: string; target: string; priority: string; reason: string }[];
    recommendations?: string[];
    economicAdjustment?: { estimatedENV: number; topStream: string; riskAssessment: string };
  } | null>(null);

  if (!isOpen) return null;

  const presetGoals = [
    'Maximize legitimate cybersecurity revenue within authorized enterprise SaaS & AI programs',
    'Focus on high-ROI Web & Cloud scopes with expected bounties > $3,000',
    'Execute 24/7 continuous non-destructive sweep on certified Gold Safe Harbor targets',
    'Prioritize Smart Contract formal verification and high-severity Web3 bounty pools',
  ];

  const handleEvaluateStrategy = async () => {
    setIsEvaluating(true);
    setEvalError(null);
    try {
      const res = await fetch('/api/mission-director/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective: objectiveInput,
          activeOpportunities: opportunities,
          agents: agents,
          pastEarnings: { totalRevenue }
        })
      });

      if (!res.ok) {
        let errMsg = `Server returned status ${res.status}`;
        try {
          const errData = await res.json();
          if (errData?.error) errMsg = errData.error;
        } catch {
          // ignore non-json error
        }
        setEvalError(errMsg);
        return;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setEvalError(`Received non-JSON response from server (status ${res.status}).`);
        return;
      }

      const data = await res.json();
      if (data && (data.strategicSummary || data.allocations)) {
        setEvaluationResult(data);
      } else {
        setEvalError('Invalid evaluation response format.');
      }
    } catch (err: any) {
      console.error('Mission director error:', err);
      setEvalError(err?.message || 'Failed to connect to Mission Director AI.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleApplyMission = () => {
    onUpdateGoal({
      objective: objectiveInput,
      priorityStream: 'API & Cloud Security',
      minimumENVThreshold: minENV,
      requireHumanApprovalBeforeSubmission: requireHumanGate,
      sandboxValidationEnforced: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Autonomous Mission Director
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  Gemini 3.7 AI Core
                </span>
              </h2>
              <p className="text-xs text-slate-400">High-level strategic commander allocating agents, compute budgets, and revenue targets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700">
          
          {/* Mission Objective Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Primary Mission Objective Directive
            </label>
            <textarea
              rows={2}
              value={objectiveInput}
              onChange={(e) => setObjectiveInput(e.target.value)}
              placeholder="e.g. Maximize legitimate cybersecurity revenue within authorized programs..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 leading-relaxed font-sans"
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-slate-400">Mission Presets:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {presetGoals.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setObjectiveInput(preset)}
                  className="p-2 text-left rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-[11px] text-slate-300 hover:text-white transition-colors truncate"
                >
                  &bull; {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Guardrail Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Min ENV Threshold */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Min. Expected Net Value (ENV)</span>
                <span className="font-mono text-emerald-400 font-bold">${minENV}</span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={500}
                value={minENV}
                onChange={(e) => setMinENV(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="text-[10px] text-slate-400 font-mono">Filters out low-yield opportunities</div>
            </div>

            {/* Human Gate */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">Human Approval Gate</div>
                <div className="text-[10px] text-slate-400">Require 1-click confirmation before report dispatch</div>
              </div>
              <input
                type="checkbox"
                checked={requireHumanGate}
                onChange={(e) => setRequireHumanGate(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
            </div>

          </div>

          {/* AI Strategy Evaluation Trigger */}
          <div className="pt-2">
            <button
              onClick={handleEvaluateStrategy}
              disabled={isEvaluating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {isEvaluating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isEvaluating ? 'Evaluating Strategy with Gemini 3.7...' : 'Run Autonomous AI Strategy Calibration'}
            </button>
          </div>

          {/* Evaluation Error Banner */}
          {evalError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center justify-between">
              <span>{evalError}</span>
              <button onClick={() => setEvalError(null)} className="text-slate-400 hover:text-white px-1">✕</button>
            </div>
          )}

          {/* AI Strategy Output */}
          {evaluationResult && (
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Bot className="w-4 h-4" /> AI Mission Strategy Blueprint
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Real-time Calibrated</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluationResult.strategicSummary}
              </p>

              {/* Economic Adjustment Metrics */}
              {evaluationResult.economicAdjustment && (
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px]">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Estimated ENV</div>
                    <div className="text-emerald-400 font-bold font-mono">
                      ${(Number(evaluationResult.economicAdjustment.estimatedENV) || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Top Stream</div>
                    <div className="text-white font-medium truncate">{evaluationResult.economicAdjustment.topStream}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Risk Level</div>
                    <div className="text-cyan-400 font-medium truncate">{evaluationResult.economicAdjustment.riskAssessment}</div>
                  </div>
                </div>
              )}

              {/* Dynamic Allocations */}
              {evaluationResult.allocations && evaluationResult.allocations.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Agent Allocations</div>
                  <div className="space-y-1">
                    {evaluationResult.allocations.map((alloc, i) => (
                      <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-300">{alloc.agentId}</span>
                          <span className="text-slate-300 truncate max-w-[240px]">&rarr; {alloc.target}</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                          {alloc.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {evaluationResult.recommendations && evaluationResult.recommendations.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase font-mono">Strategic Guardrails & Directives</div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {evaluationResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">&bull;</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApplyMission}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply Mission Directive
          </button>
        </div>

      </div>
    </div>
  );
};
