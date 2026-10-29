import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  Power, 
  Lock, 
  Unlock, 
  Ban, 
  AlertTriangle, 
  Activity, 
  CheckCircle2,
  RefreshCw,
  Sliders,
  Flame
} from 'lucide-react';
import { KillSwitchConfig, Opportunity } from '../types';

interface KillSwitchCenterProps {
  killSwitches: KillSwitchConfig;
  opportunities: Opportunity[];
  onToggleGlobalKill: () => void;
  onToggleProgramKill: (programId: string) => void;
  onToggleTargetKill: (targetDomain: string) => void;
  onToggleTechniqueKill: (technique: string) => void;
  onEmergencyReset: () => void;
}

export const KillSwitchCenter: React.FC<KillSwitchCenterProps> = ({
  killSwitches,
  opportunities,
  onToggleGlobalKill,
  onToggleProgramKill,
  onToggleTargetKill,
  onToggleTechniqueKill,
  onEmergencyReset
}) => {
  const [newDomain, setNewDomain] = useState('');
  const [newTechnique, setNewTechnique] = useState('');

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    onToggleTargetKill(newDomain.trim());
    setNewDomain('');
  };

  const handleAddTechnique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechnique.trim()) return;
    onToggleTechniqueKill(newTechnique.trim());
    setNewTechnique('');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg ${
        killSwitches.globalKillSwitch 
          ? 'bg-rose-950/40 border-rose-500/60 ring-2 ring-rose-500/40' 
          : 'bg-slate-900/70 border-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            killSwitches.globalKillSwitch 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' 
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}>
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Emergency Kill Switches & Circuit Breakers</h2>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                killSwitches.globalKillSwitch 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {killSwitches.globalKillSwitch ? 'SYSTEM HARD HALTED' : 'STANDBY ARMED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly terminates all active HTTP/RPC requests, stops job execution, and pauses background worker swarms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {killSwitches.globalKillSwitch ? (
            <button
              onClick={onEmergencyReset}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Power className="w-4 h-4" />
              Reset & Disarm Global Halt
            </button>
          ) : (
            <button
              onClick={onToggleGlobalKill}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <AlertOctagon className="w-4 h-4" />
              GLOBAL KILL SWITCH (HALT ALL)
            </button>
          )}
        </div>
      </div>

      {/* Grid of Targeted Circuit Breakers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* 1. Per-Program Kill Switches */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
              <Ban className="w-3.5 h-3.5 text-rose-400" />
              Program-Level Kill Switches
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">{opportunities.length} Scopes</span>
          </div>

          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
            {opportunities.map(opp => {
              const isHalted = !!killSwitches.programKillSwitches[opp.id];
              return (
                <div 
                  key={opp.id} 
                  className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${
                    isHalted ? 'bg-rose-950/20 border-rose-500/40' : 'bg-slate-950 border-slate-800'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold text-white text-xs truncate">{opp.programName}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{opp.platform}</div>
                  </div>
                  <button
                    onClick={() => onToggleProgramKill(opp.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                      isHalted 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isHalted ? 'HALTED' : 'ALLOW'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Target Domain Hard Blocks */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Target Domain Blacklist
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {Object.keys(killSwitches.targetKillSwitches).length} Blocked
            </span>
          </div>

          <form onSubmit={handleAddDomain} className="flex gap-1.5">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="e.g. *.segment.io or payment.internal"
              className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
            >
              Block
            </button>
          </form>

          <div className="space-y-1.5 max-h-[210px] overflow-y-auto pr-1 font-mono">
            {Object.keys(killSwitches.targetKillSwitches).length === 0 ? (
              <div className="text-[11px] text-slate-500 text-center py-4">No domain blacklists active</div>
            ) : (
              Object.keys(killSwitches.targetKillSwitches).map(domain => (
                <div key={domain} className="p-2 rounded bg-rose-950/20 border border-rose-500/30 flex items-center justify-between text-[11px]">
                  <span className="text-rose-300 truncate">{domain}</span>
                  <button
                    onClick={() => onToggleTargetKill(domain)}
                    className="text-slate-400 hover:text-white ml-2 text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Technique Kill Switches */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Technique Circuit Breakers
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {Object.keys(killSwitches.techniqueKillSwitches).length} Barred
            </span>
          </div>

          <form onSubmit={handleAddTechnique} className="flex gap-1.5">
            <input
              type="text"
              value={newTechnique}
              onChange={(e) => setNewTechnique(e.target.value)}
              placeholder="e.g. Fuzzing, GraphQL Depth"
              className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
            >
              Bar
            </button>
          </form>

          <div className="space-y-1.5 max-h-[210px] overflow-y-auto pr-1 font-mono">
            {['Denial of Service (DoS)', 'High-Rate Fuzzing (>10 rps)', 'Credential Stuffing'].map(t => {
              const isBarred = killSwitches.techniqueKillSwitches[t] !== false;
              return (
                <div key={t} className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 truncate">{t}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                    PERMA-BARRED
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
