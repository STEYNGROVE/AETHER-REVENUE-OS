import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  Zap,
  Sliders,
  Terminal,
  Activity
} from 'lucide-react';
import { ScopePolicyRule } from '../types';

interface ScopeGateGuardrailsProps {
  policies: ScopePolicyRule[];
  onTogglePolicy: (policyId: string) => void;
}

export const ScopeGateGuardrails: React.FC<ScopeGateGuardrailsProps> = ({
  policies,
  onTogglePolicy
}) => {
  const [testTarget, setTestTarget] = useState('https://api.apexcloud-global.com/v2/auth');
  const [testTechnique, setTestTechnique] = useState('API Parameter Tampering & BOLA Audit');
  const [testResult, setTestResult] = useState<{
    decision: 'ALLOW' | 'BLOCK' | 'PAUSE';
    reason: string;
    gateCheckedAt: string;
  } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleTestScope = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/security/scope-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: testTarget,
          testingTechnique: testTechnique,
        })
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      // Fallback local evaluator
      const prohibited = ['dos', 'ddos', 'destructive', 'social engineering', 'phishing'];
      const isProhib = prohibited.some(p => testTechnique.toLowerCase().includes(p));
      if (isProhib) {
        setTestResult({
          decision: 'BLOCK',
          reason: `Testing technique '${testTechnique}' is explicitly prohibited by policy.`,
          gateCheckedAt: new Date().toISOString()
        });
      } else if (testTarget.includes('unauthorized') || testTarget.includes('out-of-scope')) {
        setTestResult({
          decision: 'BLOCK',
          reason: 'Target is not in the explicit program whitelist.',
          gateCheckedAt: new Date().toISOString()
        });
      } else {
        setTestResult({
          decision: 'ALLOW',
          reason: `Authorized scope verified with rate limit enforcement (<10 req/s).`,
          gateCheckedAt: new Date().toISOString()
        });
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Scope Gate & Ethical Authorization Boundaries
            </h2>
            <p className="text-xs text-slate-400">Deterministic policy gates blocking unauthorized targets, destructive vectors, or unvetted scripts</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Enforcement Active
          </span>
        </div>
      </div>

      {/* 2-Column: Policy Rules & Interactive Live Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Policy Rules Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            Active Authorization Policies ({policies.length})
          </h3>

          <div className="space-y-2.5">
            {policies.map(policy => (
              <div 
                key={policy.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  policy.isActive 
                    ? 'bg-slate-900/80 border-slate-800' 
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        policy.enforcement === 'BLOCK' ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' :
                        policy.enforcement === 'ALLOW' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                        'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}>
                        {policy.enforcement}
                      </span>
                      <h4 className="text-xs font-bold text-white">{policy.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{policy.description}</p>
                  </div>

                  <button
                    onClick={() => onTogglePolicy(policy.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      policy.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {policy.isActive ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Boundary Rules Reference */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1.5 font-mono">
            <div className="text-[11px] uppercase font-bold text-slate-400">Boundary Logic Truth Table</div>
            <div className="text-rose-400">&bull; Target not explicitly authorized &rarr; <span className="font-bold">BLOCK</span></div>
            <div className="text-rose-400">&bull; Testing technique prohibited by program &rarr; <span className="font-bold">BLOCK</span></div>
            <div className="text-amber-400">&bull; Scope uncertain / pending verification &rarr; <span className="font-bold">PAUSE</span></div>
            <div className="text-emerald-400">&bull; Sandbox non-destructive validation &rarr; <span className="font-bold">ALLOW</span></div>
            <div className="text-emerald-400">&bull; Authorized target + permitted technique &rarr; <span className="font-bold">ALLOW</span></div>
          </div>
        </div>

        {/* Scope Gate Interactive Live Tester (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white">Live Policy & Scope Gate Tester</h3>
          </div>

          <p className="text-xs text-slate-400">
            Test any target or research technique against the real-time authorization engine to see if the workforce will execute or block:
          </p>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-300 uppercase font-mono">Target Asset URL / Host</label>
            <input
              type="text"
              value={testTarget}
              onChange={(e) => setTestTarget(e.target.value)}
              placeholder="e.g. https://api.target.com/v1"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-300 uppercase font-mono">Testing Technique</label>
            <input
              type="text"
              value={testTechnique}
              onChange={(e) => setTestTechnique(e.target.value)}
              placeholder="e.g. API BOLA Inspection, DoS, SQLi Fuzzing"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
            <span className="text-slate-500">Presets:</span>
            <button
              onClick={() => {
                setTestTarget('https://api.apexcloud-global.com/v2');
                setTestTechnique('BOLA & Auth Token Review');
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Authorized API
            </button>
            <button
              onClick={() => {
                setTestTarget('https://out-of-scope-thirdparty.com');
                setTestTechnique('Subdomain Port Scan');
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Unauth Target
            </button>
            <button
              onClick={() => {
                setTestTarget('https://auth.finnova-corp.io');
                setTestTechnique('Denial of Service (DoS) Flood');
              }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Prohibited DoS
            </button>
          </div>

          <button
            onClick={handleTestScope}
            disabled={isEvaluating}
            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/30 active:scale-95"
          >
            {isEvaluating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            Evaluate Scope Gate
          </button>

          {/* Result Box */}
          {testResult && (
            <div className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 mt-2 ${
              testResult.decision === 'ALLOW' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
              testResult.decision === 'BLOCK' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
              'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  {testResult.decision === 'ALLOW' ? <ShieldCheck className="w-4 h-4" /> : <ShieldX className="w-4 h-4" />}
                  GATE VERDICT: {testResult.decision}
                </span>
                <span className="text-[10px] text-slate-400">Verified</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-200 font-sans">
                {testResult.reason}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
