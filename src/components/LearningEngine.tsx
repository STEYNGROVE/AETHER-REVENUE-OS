import React, { useState } from 'react';
import { 
  GraduationCap, 
  Brain, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Zap,
  SlidersHorizontal,
  Lightbulb
} from 'lucide-react';
import { VulnerabilityFinding } from '../types';

interface LearningEngineProps {
  findings: VulnerabilityFinding[];
}

export const LearningEngine: React.FC<LearningEngineProps> = ({ findings }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [learningError, setLearningError] = useState<string | null>(null);
  const [learningInsights, setLearningInsights] = useState<{
    learningSummary: string;
    weightAdjustments: { domain: string; delta: string; currentWeight: number; rationale: string }[];
    newHeuristicsLearned: string[];
  }>({
    learningSummary: 'Autonomous Learning Agent evaluated 1,420 historical assessment cycles. Findings in API BOLA and Cloud IAM exhibit 94% acceptance rates with minimal duplicate collisions. Adjusting agent allocation weights dynamically.',
    weightAdjustments: [
      { domain: 'API Security (BOLA/BFLA)', delta: '+18%', currentWeight: 0.92, rationale: 'Highest bounty density ($4,800 avg) and fastest triage turnaround (2.1 days).' },
      { domain: 'Cloud IAM & Kubernetes RBAC', delta: '+12%', currentWeight: 0.88, rationale: 'Zero false-positive sandbox validation rate across enterprise cloud scopes.' },
      { domain: 'AI Security (Prompt Injection)', delta: '+15%', currentWeight: 0.85, rationale: 'Emerging high-payout category with 90%+ acceptance on authorized private VDPs.' },
      { domain: 'Client-Side DOM XSS', delta: '-25%', currentWeight: 0.30, rationale: 'High duplicate rate and lower average payouts on mature public programs.' }
    ],
    newHeuristicsLearned: [
      'Prioritize GraphQL schemas where introspection is disabled for deep parameter fuzzing.',
      'Filter out WAF edge-block rate alarms before provisioning isolated sandbox containers.',
      'Fast-track private invite-only bug bounty programs with explicit Gold Safe Harbor clauses.'
    ]
  });

  const handleRunAIRelearning = async () => {
    setIsAnalyzing(true);
    setLearningError(null);
    try {
      const res = await fetch('/api/learning/analyze-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ triageHistory: findings })
      });
      if (!res.ok) {
        let errMsg = `Server returned status ${res.status}`;
        try {
          const errData = await res.json();
          if (errData?.error) errMsg = errData.error;
        } catch {
          // ignore non-json error
        }
        setLearningError(errMsg);
        return;
      }
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setLearningError(`Server returned non-JSON response (${res.status}).`);
        return;
      }
      const data = await res.json();
      if (data && data.learningSummary) {
        setLearningInsights(data);
      }
    } catch (err: any) {
      console.error('Learning feedback error:', err);
      setLearningError(err?.message || 'Failed to analyze learning feedback.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Autonomous Continuous Learning Engine
            </h2>
            <p className="text-xs text-slate-400">
              Refining acceptance probability models & heuristic weights based on real triage feedback
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAIRelearning}
          disabled={isAnalyzing}
          className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-violet-950/30 active:scale-95"
        >
          {isAnalyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
          Run AI Strategy Relearning
        </button>
      </div>

      {/* Error Message */}
      {learningError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center justify-between">
          <span>{learningError}</span>
          <button onClick={() => setLearningError(null)} className="text-slate-400 hover:text-white px-1">✕</button>
        </div>
      )}

      {/* Main Grid: Executive Summary & Heuristics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Dynamic Domain Weight Adjustments (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
              Dynamic Domain Weight Allocation
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">Auto-Optimized</span>
          </div>

          <div className="space-y-2.5">
            {learningInsights.weightAdjustments.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.domain}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className={`font-bold ${item.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.delta}
                    </span>
                    <span className="text-slate-400 text-[11px]">Weight: {(item.currentWeight * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 rounded-full"
                    style={{ width: `${item.currentWeight * 100}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{item.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learned Heuristics & Strategic Rules (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase font-mono">Learned Operational Rules</h3>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {learningInsights.learningSummary}
          </div>

          <div className="space-y-2 flex-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase font-mono">Active Heuristics</div>
            {learningInsights.newHeuristicsLearned.map((rule, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
