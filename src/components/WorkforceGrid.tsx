import React, { useState } from 'react';
import { 
  Crown, 
  Radar, 
  ShieldCheck, 
  Crosshair, 
  Globe, 
  Server, 
  Smartphone, 
  Cloud, 
  Bot, 
  Boxes, 
  Code2, 
  Sparkles, 
  Cpu, 
  FileCheck, 
  FileText, 
  Briefcase, 
  DollarSign, 
  GraduationCap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Radio
} from 'lucide-react';
import { Agent, AgentDepartment } from '../types';

interface WorkforceGridProps {
  agents: Agent[];
  onTriggerAgentAnalysis?: (agent: Agent) => void;
}

const ICON_MAP: Record<string, any> = {
  Crown,
  Radar,
  ShieldCheck,
  Crosshair,
  Globe,
  Server,
  Smartphone,
  Cloud,
  Bot,
  Boxes,
  Code2,
  Sparkles,
  Cpu,
  FileCheck,
  FileText,
  Briefcase,
  DollarSign,
  GraduationCap,
};

export const WorkforceGrid: React.FC<WorkforceGridProps> = ({
  agents,
  onTriggerAgentAnalysis
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents[0] || null);

  const departments: (AgentDepartment | 'ALL')[] = [
    'ALL',
    'Executive',
    'Scope & Recon',
    'Vulnerability Research',
    'Validation & Evidence',
    'Economics & Operations'
  ];

  const filteredAgents = selectedDept === 'ALL' 
    ? agents 
    : agents.filter(a => a.department === selectedDept);

  return (
    <div className="space-y-4">
      
      {/* Top Header & Department Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Autonomous AI Workforce ({agents.length} Specialized Agents)
            </h2>
            <p className="text-xs text-slate-400">Continuously running multi-agent swarm with role segregation & authorization limits</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workforce Grid & Active Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Agent Cards (2 Columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredAgents.map(agent => {
            const Icon = ICON_MAP[agent.avatar] || Bot;
            const isSelected = selectedAgent?.id === agent.id;
            
            const statusColor = 
              agent.status === 'analyzing' || agent.status === 'validating' ? 'text-amber-400 bg-amber-400/10 border-amber-400/30' :
              agent.status === 'verifying' ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' :
              agent.status === 'reporting' ? 'text-sky-400 bg-sky-400/10 border-sky-400/30' :
              agent.status === 'learning' ? 'text-violet-400 bg-violet-400/10 border-violet-400/30' :
              'text-slate-400 bg-slate-800 border-slate-700';

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/30' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tracking-tight">{agent.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {agent.role} &middot; {agent.department}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${statusColor}`}>
                    {agent.status}
                  </span>
                </div>

                {/* Current Task */}
                <div className="mt-2.5 text-xs text-slate-300 line-clamp-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 font-mono text-[11px]">
                  <span className="text-slate-500 mr-1">&gt;</span>
                  {agent.currentTask}
                </div>

                {/* Stats Footer */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {((agent.efficiencyRating ?? 0) * 100).toFixed(0)}% Precision
                  </span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    ${(agent.netRevenueGenerated ?? 0).toLocaleString()} Gen
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Agent Inspector & Activity Stream */}
        {selectedAgent && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-full max-h-[580px]">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  {React.createElement(ICON_MAP[selectedAgent.avatar] || Bot, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedAgent.role} Agent</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">Tasks Completed</div>
                <div className="text-sm font-bold text-white font-mono">{selectedAgent.tasksCompleted}</div>
              </div>
            </div>

            {/* Agent Efficiency & Net Value */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Authorization State</div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bound by Policy
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Net Value Generated</div>
                <div className="text-xs font-mono font-bold text-emerald-300 mt-0.5">
                  ${(selectedAgent.netRevenueGenerated ?? 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Current Active Mission */}
            <div className="mb-3">
              <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                Active Directives
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                {selectedAgent.currentTask}
              </div>
            </div>

            {/* Live Thought Stream / Event Logs */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Live Thought & Audit Stream
                </span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  STREAMING
                </span>
              </div>

              <div className="flex-1 overflow-y-auto bg-slate-950/90 border border-slate-800/90 rounded-lg p-2.5 space-y-2 font-mono text-[11px] scrollbar-thin scrollbar-thumb-slate-700">
                {selectedAgent.recentLogs.map((log, index) => (
                  <div 
                    key={index}
                    className={`p-1.5 rounded border ${
                      log.type === 'block' ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' :
                      log.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' :
                      log.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' :
                      'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span>[{log.timestamp}]</span>
                      <span className="uppercase font-semibold">{log.type}</span>
                    </div>
                    <div>{log.message}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
