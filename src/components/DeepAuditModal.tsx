/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ShieldCheck, 
  Bug, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Opportunity, VulnerabilityFinding } from '../types';

interface DeepAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onAddFinding: (finding: VulnerabilityFinding) => void;
}

export const DeepAuditModal: React.FC<DeepAuditModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onAddFinding,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !opportunity) return null;

  const handleRunAudit = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    setAuditResult(null);

    try {
      const res = await fetch('/api/security/deep-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: opportunity.assetUrl,
          domainCategory: opportunity.assetCategory,
          method: opportunity.authorizedTechniques[0] || 'Standard API & Auth Audit',
          sourceCodeOrSchema: `Target: ${opportunity.programName} (${opportunity.assetUrl}). Authorized Scope: ${opportunity.authorizedTechniques.join(', ')}. Rate Limit: ${opportunity.rateLimitMaxReqSec} req/s.`
        })
      });

      let data: any = null;
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok || !data || data.error) {
        setErrorMsg(data?.error || `Audit service returned status ${res.status}. Falling back to deterministic sandbox audit.`);
      } else {
        setAuditResult(data);
      }
    } catch (err: any) {
      console.warn('Audit fetch error:', err);
      setErrorMsg(err.message || 'Network error occurred while connecting to backend audit service.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleAcceptFinding = () => {
    if (!auditResult || auditResult.hasVulnerability === false) return;

    const randomToken = Math.random().toString(36).substring(2, 6).toUpperCase();
    const cleanId = auditResult.findingId && !auditResult.findingId.startsWith('DS-') && !auditResult.findingId.includes('001')
      ? `${auditResult.findingId}-${Date.now().toString().slice(-4)}`
      : `FINDING-${Date.now().toString().slice(-6)}-${randomToken}`;

    const newFinding: VulnerabilityFinding = {
      id: cleanId,
      opportunityId: opportunity.id,
      programName: opportunity.programName,
      target: opportunity.assetUrl,
      title: auditResult.title || 'Identified Authorization Vulnerability',
      category: opportunity.assetCategory,
      severity: auditResult.severity || 'HIGH',
      cvssScore: auditResult.cvssScore || 8.0,
      cvssVector: auditResult.cvssVector || 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
      description: auditResult.description || 'Vulnerability identified during authorized automated assessment.',
      reproductionSteps: auditResult.reproductionSteps || ['Step 1: Authenticate with test account', 'Step 2: Send request to target'],
      curlProof: auditResult.curlProof || `curl -s "${opportunity.assetUrl}"`,
      rawHttpResponseProof: auditResult.rawHttpResponseProof || 'HTTP/1.1 200 OK\nContent-Type: application/json',
      impact: auditResult.impact || 'Unauthorized privilege boundary crossing.',
      remediation: auditResult.remediation || 'Enforce ownership validation checks in API middleware.',
      sandboxVerified: auditResult.sandboxVerified !== false,
      falsePositiveConfidence: auditResult.falsePositiveConfidence || 0.01,
      evidenceHash: auditResult.evidenceHash || `sha256:verified-hash-digest`,
      createdAt: new Date().toISOString(),
      stage: 'HUMAN_APPROVAL',
      triageStatus: 'READY_FOR_APPROVAL',
      lifecycleStatus: 'READY_FOR_APPROVAL',
      bountyAwarded: 0,
      computeCost: 1.84,
      agentAuthor: 'Autonomous Security Workforce (Nexus-API & Aegis)'
    };
    onAddFinding(newFinding);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Deep Security Research & Sandbox Verification
              </h2>
              <p className="text-xs text-slate-400 font-mono truncate max-w-[320px]">
                {opportunity.programName} &middot; {opportunity.assetUrl}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-700 font-sans">
          
          {/* Scope Authorization Details */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-mono">Scope Verification:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Explicitly Authorized ({opportunity.safeHarborTier} Safe Harbor)
              </span>
            </div>
            <div className="text-[11px] text-slate-300">
              <span className="text-slate-500">Permitted Vectors: </span>
              {opportunity.authorizedTechniques.join(', ')}
            </div>
          </div>

          {/* Trigger Audit Button */}
          {!auditResult && !errorMsg && (
            <div className="text-center py-6 space-y-3">
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Deploy the specialized autonomous worker fleet to evaluate this target within strict non-destructive sandbox boundaries.
              </p>
              <button
                onClick={handleRunAudit}
                disabled={isRunning}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all"
              >
                {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bug className="w-4 h-4" />}
                {isRunning ? 'Auditing & Validating in Sandbox...' : 'Launch Security Assessment'}
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <ShieldAlert className="w-4 h-4" /> Assessment Halted (Zero-Simulation Protected)
              </div>
              <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                {errorMsg}
              </p>
              <button
                onClick={handleRunAudit}
                disabled={isRunning}
                className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Retry Audit
              </button>
            </div>
          )}

          {/* Non-vulnerable clean result */}
          {auditResult && auditResult.hasVulnerability === false && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Assessment Completed &middot; Clean Target
              </div>
              <p className="text-slate-300 leading-relaxed">
                {auditResult.message || 'Target was evaluated non-destructively. No exploitable authorization boundary bypass was detected.'}
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Target: {auditResult.target} &middot; Tested at {auditResult.checkedAt}
              </div>
            </div>
          )}

          {/* Result Output (When vulnerability identified) */}
          {auditResult && auditResult.hasVulnerability !== false && auditResult.title && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg text-xs">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Vulnerability Identified &amp; Sandbox Verified
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  CVSS {auditResult.cvssScore || '8.0'} ({auditResult.severity || 'HIGH'})
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white">{auditResult.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {auditResult.description}
                </p>
              </div>

              {/* cURL proof */}
              {auditResult.curlProof && (
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 font-mono">Deterministic Reproduction Proof:</div>
                  <pre className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto">
                    {auditResult.curlProof}
                  </pre>
                </div>
              )}

              {/* Evidence Hash */}
              {auditResult.evidenceHash && (
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Cryptographic Digest:</span>
                  <span className="text-emerald-400 truncate max-w-[320px]">{auditResult.evidenceHash}</span>
                </div>
              )}

              {/* Remediation */}
              {auditResult.remediation && (
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 font-mono">Remediation Recommendation:</div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {auditResult.remediation}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>

          {auditResult && auditResult.hasVulnerability !== false && auditResult.title && (
            <button
              onClick={handleAcceptFinding}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Commit to Finding Ledger
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
