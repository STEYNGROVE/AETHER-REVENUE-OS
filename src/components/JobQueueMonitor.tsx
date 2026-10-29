import React from 'react';
import { 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Ban, 
  Play, 
  RefreshCw,
  Terminal,
  Zap
} from 'lucide-react';
import { ExecutionJob } from '../types';

interface JobQueueMonitorProps {
  jobs: ExecutionJob[];
  onTriggerJob: (jobId: string) => void;
}

export const JobQueueMonitor: React.FC<JobQueueMonitorProps> = ({ jobs, onTriggerJob }) => {
  const activeCount = jobs.filter(j => j.status === 'RUNNING' || j.status === 'VALIDATING').length;
  const totalTokens = jobs.reduce((acc, curr) => acc + curr.tokensConsumed, 0);
  const totalCost = jobs.reduce((acc, curr) => acc + curr.computeCost, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Persistent Execution Job Queue & Worker Mesh</h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-cyan-500/20 text-cyan-300">
                {activeCount} Active Workers
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Deterministic background execution jobs with token billing telemetry and policy guardrails.
            </p>
          </div>
        </div>

        {/* Telemetry Summary */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Tokens Consumed</span>
            <span className="text-cyan-300 font-bold">{(totalTokens ?? 0).toLocaleString()}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Compute Cost</span>
            <span className="text-emerald-400 font-bold">${(totalCost ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Active & Historic Execution Jobs ({jobs.length})
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Deterministic Worker Engine</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-sans">Job ID & Program</th>
                <th className="py-2.5 px-4">Assigned Agent</th>
                <th className="py-2.5 px-4">Stage</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Policy Decision</th>
                <th className="py-2.5 px-4 text-right">Tokens / Cost</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-sans">
                    <div className="font-bold text-white text-xs">{job.id}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{job.programName}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate max-w-[220px]">{job.target}</div>
                  </td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">
                    {job.assignedAgent}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {job.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-fit ${
                      job.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      job.status === 'RUNNING' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' :
                      job.status === 'VALIDATING' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {job.status === 'RUNNING' && <RefreshCw className="w-3 h-3 animate-spin" />}
                      {job.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      job.policyDecision === 'ALLOW' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {job.policyDecision}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="text-white font-bold">{(job.tokensConsumed ?? 0).toLocaleString()} tkn</div>
                    <div className="text-[10px] text-emerald-400 font-mono">${(job.computeCost ?? 0).toFixed(2)}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onTriggerJob(job.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition-colors"
                    >
                      Inspect Logs
                    </button>
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
