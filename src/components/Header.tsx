import React, { useState } from 'react';
import { 
  Shield, 
  Play, 
  Pause, 
  FastForward, 
  Compass, 
  DollarSign, 
  TrendingUp, 
  Lock, 
  Cpu,
  Sparkles,
  AlertTriangle,
  Radio,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { MissionDirectorGoal, SystemEnvironment } from '../types';

interface HeaderProps {
  autonomousMode: 'RUNNING' | 'PAUSED' | 'STEPPING';
  onToggleMode: (mode: 'RUNNING' | 'PAUSED' | 'STEPPING') => void;
  onStepCycle: () => void;
  speedMultiplier: number;
  onChangeSpeed: (multiplier: number) => void;
  totalRevenue: number;
  totalPending: number;
  activeAgentsCount: number;
  totalAgentsCount: number;
  onOpenMissionDirector: () => void;
  goal: MissionDirectorGoal;
  environment: SystemEnvironment;
  onSelectEnvironment: (env: SystemEnvironment) => void;
}

export const Header: React.FC<HeaderProps> = ({
  autonomousMode,
  onToggleMode,
  onStepCycle,
  speedMultiplier,
  onChangeSpeed,
  totalRevenue,
  totalPending,
  activeAgentsCount,
  totalAgentsCount,
  onOpenMissionDirector,
  goal,
  environment,
  onSelectEnvironment,
}) => {
  const [showEnvDropdown, setShowEnvDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        
        {/* Brand & Mission Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            {autonomousMode === 'RUNNING' && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                AETHER REVENUE OS
              </h1>

              {/* Environment Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowEnvDropdown(!showEnvDropdown)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors border ${
                    environment === 'LIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40'
                      : environment === 'SANDBOX'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                      : 'bg-purple-500/10 text-purple-300 border-purple-500/40'
                  }`}
                  title="Switch Environment Mode"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    environment === 'LIVE' ? 'bg-emerald-400 animate-pulse' : environment === 'SANDBOX' ? 'bg-amber-400' : 'bg-purple-400'
                  }`}></span>
                  {environment === 'LIVE' ? 'MAINNET LIVE' : environment === 'SANDBOX' ? 'SANDBOX LAB' : 'DEMO MODE'}
                </button>

                {showEnvDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-xl p-1 shadow-2xl z-50 animate-fadeIn">
                    <button
                      onClick={() => {
                        onSelectEnvironment('LIVE');
                        setShowEnvDropdown(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-emerald-400">MAINNET (LIVE)</div>
                        <div className="text-[10px] text-slate-400">Zero simulation & real payment clearance</div>
                      </div>
                      {environment === 'LIVE' && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                    </button>

                    <button
                      onClick={() => {
                        onSelectEnvironment('SANDBOX');
                        setShowEnvDropdown(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-amber-300">SANDBOX (LAB)</div>
                        <div className="text-[10px] text-slate-400">Controlled testing against local replicas</div>
                      </div>
                      {environment === 'SANDBOX' && <span className="text-amber-300 text-xs font-bold">✓</span>}
                    </button>

                    <button
                      onClick={() => {
                        onSelectEnvironment('DEMO');
                        setShowEnvDropdown(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-purple-300">DEMO (SYNTHETIC)</div>
                        <div className="text-[10px] text-slate-400">Demo dataset for testing interface</div>
                      </div>
                      {environment === 'DEMO' && <span className="text-purple-300 text-xs font-bold">✓</span>}
                    </button>
                  </div>
                )}
              </div>

            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-slate-300 font-mono truncate max-w-[260px]">
                {goal.objective}
              </span>
            </p>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          
          {/* Verified Cleared Revenue */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 shadow-sm">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold text-slate-400 font-mono">Verified Cleared Revenue</div>
              <div className="text-xs font-black text-emerald-400 font-mono leading-none mt-0.5">
                ${(totalRevenue ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Pending Triage */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-semibold text-slate-400 font-mono">In Triage Escrow</div>
              <div className="text-xs font-bold text-amber-300 font-mono leading-none mt-0.5">
                ${(totalPending ?? 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Workforce Capacity */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-semibold text-slate-400 font-mono">Workforce Mesh</div>
              <div className="text-xs font-bold text-cyan-300 font-mono leading-none mt-0.5">
                {activeAgentsCount}/{totalAgentsCount} Active
              </div>
            </div>
          </div>

          {/* Mission Director Trigger */}
          <button
            onClick={onOpenMissionDirector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold transition-all active:scale-95"
            title="Configure Autonomous Mission Director Objectives"
          >
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>Mission</span>
          </button>

          {/* Play / Pause / Stepping Controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {autonomousMode === 'RUNNING' ? (
              <button
                onClick={() => onToggleMode('PAUSED')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 font-medium text-xs transition-colors"
                title="Pause Autonomous Loop"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pause</span>
              </button>
            ) : (
              <button
                onClick={() => onToggleMode('RUNNING')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-medium text-xs transition-colors"
                title="Resume Autonomous Loop"
              >
                <Play className="w-3.5 h-3.5 fill-emerald-300" />
                <span className="hidden sm:inline">Auto-Run</span>
              </button>
            )}

            <button
              onClick={onStepCycle}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Execute Single Step in Loop"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>

            {/* Speed toggle */}
            <button
              onClick={() => onChangeSpeed(speedMultiplier === 1 ? 2 : speedMultiplier === 2 ? 4 : 1)}
              className="px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Cycle Speed Multiplier"
            >
              {speedMultiplier}x
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};

