import React, { useState } from 'react';
import { 
  Network, 
  Globe, 
  Server, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Database, 
  Key, 
  Cloud,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { DigitalTwinNode } from '../types';

interface DigitalTwinMapProps {
  nodes: DigitalTwinNode[];
}

export const DigitalTwinMap: React.FC<DigitalTwinMapProps> = ({ nodes }) => {
  const [selectedNode, setSelectedNode] = useState<DigitalTwinNode | null>(nodes[1] || nodes[0] || null);

  const getNodeIcon = (type: DigitalTwinNode['type']) => {
    switch (type) {
      case 'ORG': return <Globe className="w-4 h-4 text-purple-400" />;
      case 'DOMAIN': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'APPLICATION': return <Server className="w-4 h-4 text-teal-400" />;
      case 'API_ROUTE': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'AUTH_SERVICE': return <Key className="w-4 h-4 text-amber-400" />;
      case 'DATA_STORE': return <Database className="w-4 h-4 text-rose-400" />;
      default: return <Cloud className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Target Attack Surface Digital Twin</h2>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-teal-500/20 text-teal-300">
                Live Authorization Topology
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Graph representation of verified target assets, API routes, and cloud dependencies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Scope Boundary Enforced
          </span>
        </div>
      </div>

      {/* Grid: Graph Topology (8 cols) + Node Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Topology Nodes */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="font-bold text-white uppercase tracking-wider">Topology Nodes ({nodes.length})</span>
            <span className="text-slate-400 font-mono">Real-time attack surface replication</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {nodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-teal-500/50 shadow-md ring-1 ring-teal-500/30'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getNodeIcon(node.type)}
                      <span className="text-[10px] font-mono font-bold text-slate-400">{node.type}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      node.authorizedScope 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {node.authorizedScope ? 'IN-SCOPE' : 'OUT-OF-SCOPE'}
                    </span>
                  </div>

                  <div className="font-bold text-white text-xs mt-2 truncate">{node.label}</div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Env: {node.environment}</span>
                    {node.vulnerabilityCount > 0 ? (
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <ShieldAlert className="w-3 h-3" /> {node.vulnerabilityCount} Vuln
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold">Hardened</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {getNodeIcon(selectedNode.type)}
                <h3 className="font-bold text-white uppercase text-[11px]">Node Inspector</h3>
              </div>
              <span className="font-mono text-teal-400 font-bold text-[10px]">{selectedNode.id}</span>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Resource Identifier</div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-white text-xs break-all">
                {selectedNode.label}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Scope Authorization</span>
                <span className={`font-bold ${selectedNode.authorizedScope ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedNode.authorizedScope ? 'Authorized' : 'BLOCKED'}
                </span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Confidence</span>
                <span className="font-bold text-cyan-300">{(selectedNode.confidenceScore * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <div className="text-slate-400 font-bold text-[10px] uppercase">Testing Safeguard Rules</div>
              <div className="text-emerald-400">&bull; Ephemeral sandbox replica isolation</div>
              <div className="text-emerald-400">&bull; Zero production state alteration</div>
              <div className="text-cyan-400">&bull; Deterministic rate limit &lt; 10 req/s</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
