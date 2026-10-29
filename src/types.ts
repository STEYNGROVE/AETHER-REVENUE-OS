export type SystemEnvironment = 'DEMO' | 'SANDBOX' | 'LIVE';

export type CheckpointStatus = 'PASS' | 'FAIL' | 'NOT_VERIFIED' | 'IN_PROGRESS';

export interface MainnetProofCheckpoint {
  step: number;
  name: string;
  category: 'OPPORTUNITY' | 'AUTHORIZATION' | 'EXECUTION' | 'EVIDENCE' | 'SUBMISSION' | 'AWARD' | 'PAYMENT';
  status: CheckpointStatus;
  timestamp: string;
  source: string;
  recordId: string;
  evidenceHash: string;
  rawProofSnippet: string;
  verificationDetails: string;
}

export interface MainnetProofSession {
  id: string;
  targetDomain: string;
  programName: string;
  overallStatus: 'VERIFIED_MAINNET' | 'PARTIAL' | 'FAILED';
  verifiedRevenue: number;
  checkpoints: MainnetProofCheckpoint[];
  startedAt: string;
  completedAt?: string;
  signerIdentity: string;
}

export interface SecurityTxtRecord {
  domain: string;
  rawContent: string;
  contact: string[];
  policy?: string;
  preferredLanguages?: string;
  canonical?: string;
  encryption?: string;
  acknowledgments?: string;
  expires?: string;
  hiring?: string;
  sha256Hash: string;
  fetchedAt: string;
  isValid: boolean;
  safeHarborTerms: 'Gold' | 'Standard' | 'None';
  inScopePatterns: string[];
  outOfScopePatterns: string[];
}

export interface BlockchainVerificationRecord {
  network: string;
  txHash: string;
  blockNumber: number;
  explorerUrl: string;
  verificationStatus: 'CONFIRMED' | 'PENDING' | 'REJECTED_API_PERMISSIONS' | 'TESTNET_PROVEN';
  gasOrFee?: string;
  destinationConfirmed?: boolean;
  rawApiNote?: string;
}

export interface DoubleEntryTransaction {
  id: string;
  timestamp: string;
  txType: 'BOUNTY_CLEARED' | 'RETAINER_PAYMENT' | 'COMPUTE_EXPENSE' | 'TREASURY_WITHDRAWAL' | 'RESERVE_HOLD';
  debitAccount: string;
  creditAccount: string;
  amount: number;
  currency: 'USD';
  referenceId: string;
  signatures: { signer: string; role: string; signatureHex: string; timestamp: string; r?: string; s?: string; v?: number }[];
  state: 'PENDING_APPROVAL' | 'COOLING_OFF' | 'SETTLED' | 'REJECTED';
  coolingOffUntil?: string;
  independentVerificationProof?: string;
  paymentGatewayRef?: string;
  description?: string;
  settledAt?: string;
  blockchainVerification?: BlockchainVerificationRecord;
}

export interface TreasuryGovernanceState {
  clearedBalance: number;
  pendingTriageEscrow: number;
  projectedENV: number;
  potentialMRRListingValue: number;
  dailyWithdrawalLimit: number;
  withdrawnToday: number;
  multiSigThreshold: number; // e.g. 2
  totalSignersRequired: number; // e.g. 3
  signers: { id: string; name: string; role: string; address: string; isHardwareKey: boolean }[];
  allowlistDestinations: { addressOrAccount: string; label: string; addedDate: string; isVerified: boolean; requiresCoolingOff: boolean; platformType?: 'BINANCE_TRANSFER' | 'COLD_VAULT' | 'BANK_ACH' | 'TRUST_WALLET' }[];
  transactions: DoubleEntryTransaction[];
  binanceIntegration?: {
    isConfigured: boolean;
    hasLiveCredentials: boolean;
    withdrawalNetworkDefault: string; // e.g. 'TRX' / 'BSC' / 'ETH'
    supportedAssets: string[]; // ['USDT', 'USDC', 'BTC', 'ETH']
    depositAddress?: string;
    accountStatus: string;
    liveAccountInfo?: {
      status: string;
      canRead: boolean;
      canWithdraw: boolean;
      ipRestricted: boolean;
      nonZeroBalances: { coin: string; free: string; locked: string }[];
      withdrawalHistory: any[];
      lastFetchedAt: string;
    };
  };
  binanceAutoSweep?: {
    enabled: boolean;
    destinationAddress: string;
    asset: string; // 'USDT' | 'USDC' | 'BTC' | 'ETH'
    network: string; // 'TRX' | 'BSC' | 'ETH'
    lastSweepAt?: string;
    totalSweptUSD: number;
  };
}

export type OperatingStage =
  | 'DISCOVER'
  | 'FIND_OPPORTUNITIES'
  | 'VERIFY_AUTHORIZATION'
  | 'PRIORITIZE_ENV'
  | 'AUTOMATIC_RESEARCH'
  | 'DETECT_VULNERABILITIES'
  | 'VALIDATE_SANDBOX'
  | 'ELIMINATE_FALSE_POSITIVES'
  | 'GENERATE_EVIDENCE'
  | 'CALCULATE_SEVERITY'
  | 'GENERATE_REPORT'
  | 'HUMAN_APPROVAL'
  | 'TRACK_TRIAGE'
  | 'TRACK_REWARD'
  | 'LEARN';

export type AgentRole =
  | 'CEO'
  | 'Opportunity'
  | 'Scope'
  | 'Recon'
  | 'Web'
  | 'API'
  | 'Mobile'
  | 'Cloud'
  | 'AI Security'
  | 'Web3'
  | 'Code'
  | 'Research'
  | 'Duplicate'
  | 'Validation'
  | 'Evidence'
  | 'Report'
  | 'Judge'
  | 'Business'
  | 'Finance'
  | 'Learning';

export type AgentDepartment =
  | 'Executive'
  | 'Scope & Recon'
  | 'Vulnerability Research'
  | 'Validation & Evidence'
  | 'Economics & Operations';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  department: AgentDepartment;
  avatar: string;
  status: 'idle' | 'analyzing' | 'verifying' | 'validating' | 'reporting' | 'learning' | 'blocked';
  currentTask: string;
  efficiencyRating: number; // 0.0 - 1.0
  tasksCompleted: number;
  netRevenueGenerated: number;
  recentLogs: { timestamp: string; message: string; type: 'info' | 'success' | 'warning' | 'block' }[];
}

export type BusinessEngineType = 'RESEARCH' | 'SERVICES' | 'SAAS' | 'PLATFORM';

export type RevenuePillarId = 
  | 1  // Vulnerability Research
  | 2  // Security Testing Services
  | 3  // Recurring SaaS
  | 4  // Security Marketplace
  | 5  // AI Security
  | 6  // Web3 Security
  | 7  // Enterprise Contracts
  | 8  // Security Products
  | 9  // Research Intelligence
  | 10 // Training & Labs
  | 11 // CTF & Competitions
  | 12 // Open-Source Monetization
  | 13 // Referral / Affiliate
  | 14 // Enterprise Licensing
  | 15 // White-Label Platform
  | 16 // Compute / Resource Marketplace
  | 17 // Data / Analytics Products
  | 18 // Security Insurance Ecosystem
  | 19 // Government / Public Sector Contracts
  | 20; // Researcher Terminal Infrastructure

export interface RevenuePillarMeta {
  id: RevenuePillarId;
  name: string;
  category: string;
  engine: BusinessEngineType;
  description: string;
  primaryMechanisms: string[];
  predictabilityTier: 'HIGH_RECURRING' | 'MEDIUM_STABLE' | 'VARIABLE_HIGH_UPSIDE';
  legalSafetyBaseline: string;
  activeOpportunitiesCount: number;
  totalGeneratedRevenue: number;
  projectedAnnualRunRate: number;
  averageProfitMarginPct: number;
}

export type PlatformType =
  | 'HackerOne'
  | 'Bugcrowd'
  | 'Intigriti'
  | 'Private VDP'
  | 'Smart Contract Audit'
  | 'Enterprise Consulting'
  | 'AI Red Team'
  | 'CTF Bounty'
  | 'Enterprise SaaS Monitor'
  | 'Government Contract'
  | 'Marketplace Escrow'
  | 'License Subscription'
  | 'Compute Exchange';

export type AssetCategory =
  | 'Web'
  | 'API'
  | 'Cloud'
  | 'Mobile'
  | 'AI System'
  | 'Web3'
  | 'Source Code'
  | 'Infrastructure'
  | 'Dataset'
  | 'SaaS Platform';

export type ScopeStatus = 'AUTHORIZED' | 'BLOCKED' | 'PENDING_VERIFICATION' | 'SANDBOX_ONLY';

export interface Opportunity {
  id: string;
  programName: string;
  platform: PlatformType;
  assetUrl: string;
  assetCategory: AssetCategory;
  scopeStatus: ScopeStatus;
  maxBounty: number;
  expectedReward: number;
  acceptanceProb: number; // 0.0 - 1.0
  estimatedResearchCost: number;
  expectedNetValue: number; // (acceptanceProb * expectedReward) - estimatedResearchCost
  
  // Multi-Factor Opportunity Scoring Extensions
  timeRequiredHours?: number;
  computeCost?: number;
  humanReviewCost?: number;
  riskScore?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_LEGAL_RISK';
  competitionLevel?: 'LOW' | 'MODERATE' | 'HIGH' | 'CROWDED';
  duplicateProbability?: number; // 0.0 - 1.0
  expectedNetProfit?: number; // (acceptanceProb * (1 - duplicateProb) * expectedReward) - computeCost - humanReviewCost
  profitPerHour?: number; // expectedNetProfit / timeRequiredHours
  
  // Revenue Universe Metadata
  pillarId?: RevenuePillarId;
  businessEngine?: BusinessEngineType;
  pillarName?: string;
  commercialLegitimacyVerified?: boolean;
  
  testingWindow: string;
  rateLimitMaxReqSec: number;
  authorizedTechniques: string[];
  prohibitedTechniques: string[];
  safeHarborCertified: boolean;
  safeHarborTier: 'Gold' | 'Standard' | 'None';
  programRulesUrl?: string;
  createdAt: string;
  lastUpdated: string;
}

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type FindingLifecycleStatus =
  | 'DISCOVERED'
  | 'ANALYZING'
  | 'VALIDATING'
  | 'VERIFIED'
  | 'READY_FOR_APPROVAL'
  | 'SUBMITTED'
  | 'ACCEPTED'
  | 'REWARD_PENDING'
  | 'PAID'
  | 'REJECTED'
  | 'DUPLICATE_FLAGGED';

export type TriageStatus =
  | 'DRAFT'
  | 'READY_FOR_APPROVAL'
  | 'SUBMITTED'
  | 'TRIAGED'
  | 'ACCEPTED'
  | 'REWARDED'
  | 'REJECTED';

export interface AdversarialDebate {
  redTeamClaim: string;
  redTeamProof: string;
  blueTeamChallenge: string;
  blueTeamMitigationCheck: string;
  judgeVerdict: 'PASS' | 'FAIL' | 'NEEDS_MORE_EVIDENCE';
  judgeConfidenceScore: number;
  judgeRationale: string;
  timestamp: string;
}

export interface DuplicateIntelligenceScore {
  cveSimilarityScore: number; // 0 - 1
  knownPatternSimilarity: number;
  duplicateProbability: number;
  noveltyScore: number;
  matchedAdvisories: string[];
  recommendation: 'PROCEED_HIGH_NOVELTY' | 'MANUAL_REVIEW_REQUIRED' | 'HIGH_DUPLICATE_RISK';
}

export interface EvidenceVaultItem {
  evidenceId: string;
  findingId: string;
  missionId: string;
  authorizationId: string;
  target: string;
  timestamp: string;
  agentVersion: string;
  toolVersion: string;
  inputSha256: string;
  outputSha256: string;
  rawHttpTrace: string;
  sandboxId: string;
  sandboxExecutionTimeMs: number;
  curlReproductionCommand: string;
  cryptographicEvidenceHash: string;
  isImmutable: boolean;
}

export interface VulnerabilityFinding {
  id: string;
  opportunityId: string;
  programName: string;
  target: string;
  title: string;
  category: AssetCategory;
  severity: SeverityLevel;
  cvssScore: number;
  cvssVector: string;
  description: string;
  reproductionSteps: string[];
  curlProof: string;
  rawHttpResponseProof?: string;
  impact: string;
  remediation: string;
  sandboxVerified: boolean;
  falsePositiveConfidence: number; // e.g. 0.01
  evidenceHash: string;
  createdAt: string;
  stage: OperatingStage;
  lifecycleStatus: FindingLifecycleStatus;
  triageStatus: TriageStatus;
  bountyAwarded: number;
  computeCost: number;
  agentAuthor: string;
  adversarialDebate?: AdversarialDebate;
  duplicateScore?: DuplicateIntelligenceScore;
  verifiedPaymentReference?: string;
}

export interface ScopePolicyRule {
  id: string;
  title: string;
  category: 'TARGET' | 'TECHNIQUE' | 'RATE_LIMIT' | 'SANDBOX' | 'CREDENTIAL';
  enforcement: 'BLOCK' | 'ALLOW' | 'PAUSE' | 'SANDBOX_ONLY';
  description: string;
  isActive: boolean;
  matchedViolationsCount: number;
}

export interface KillSwitchConfig {
  globalKillSwitch: boolean;
  programKillSwitches: { [programId: string]: boolean };
  targetKillSwitches: { [targetDomain: string]: boolean };
  techniqueKillSwitches: { [technique: string]: boolean };
  rateLimitExceededLock: boolean;
  emergencyReason?: string;
  lastActivatedAt?: string;
}

export interface RealityIndexMetrics {
  dataIntegrityPct: number; // 0 - 100
  executionRealityPct: number; // 0 - 100
  evidenceRealityPct: number; // 0 - 100
  revenueRealityPct: number; // 0 - 100
  integrationRealityPct: number; // 0 - 100
  sandboxRealityPct: number; // 0 - 100
  activeSandboxesCount: number;
  verifiedTransactionsCount: number;
  unverifiedAmountFlagged: number;
}

export type RevenueTier = 'PREDICTED' | 'POTENTIAL' | 'PENDING' | 'AWARDED' | 'VERIFIED';

export interface VerifiedLedgerEntry {
  id: string;
  findingId?: string;
  opportunityId?: string;
  programName: string;
  revenueTier: RevenueTier;
  amount: number;
  currency: string;
  operatingCost: number;
  netProfit: number;
  paymentReference?: string;
  verificationSource?: string;
  timestamp: string;
  isConfirmedByBankOrEscrow: boolean;
}

export interface RevenueStreamBreakdown {
  streamName: string;
  category: string;
  verifiedEarnings: number;
  pendingTriage: number;
  computeExpenses: number;
  roiMultiplier: number;
  activeOpportunitiesCount: number;
}

export interface MissionDirectorGoal {
  objective: string;
  priorityStream: string;
  minimumENVThreshold: number;
  requireHumanApprovalBeforeSubmission: boolean;
  sandboxValidationEnforced: boolean;
  adversarialDebateRequired: boolean;
  autoRebalanceWorkforce: boolean;
}

export interface ExecutionJob {
  id: string;
  opportunityId: string;
  programName: string;
  target: string;
  assignedAgent: string;
  status: 'QUEUED' | 'RUNNING' | 'VALIDATING' | 'COMPLETED' | 'BLOCKED' | 'FAILED' | 'PAUSED_FOR_REVIEW';
  stage: OperatingStage;
  startTime: string;
  endTime?: string;
  computeCost: number;
  tokensConsumed: number;
  logs: string[];
  findingsGeneratedCount: number;
  policyDecision: 'ALLOW' | 'DENY' | 'PAUSE_FOR_REVIEW' | 'SANDBOX_ONLY';
}

export interface DigitalTwinNode {
  id: string;
  label: string;
  type: 'ORG' | 'DOMAIN' | 'APPLICATION' | 'API_ROUTE' | 'AUTH_SERVICE' | 'CLOUD_RESOURCE' | 'DATA_STORE';
  environment: 'PRODUCTION' | 'STAGING' | 'SANDBOX_REPLICA';
  authorizedScope: boolean;
  confidenceScore: number;
  vulnerabilityCount: number;
  parent?: string;
}

export interface EnterpriseSaaSMonitor {
  id: string;
  clientName: string;
  contractTier: 'Enterprise 24/7' | 'Continuous Pro' | 'Standard Shield';
  monthlyRecurringRevenue: number;
  monitoredAssetsCount: number;
  lastAuditTimestamp: string;
  criticalIssuesResolved: number;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'ONBOARDING';
  safeHarborSigned: boolean;
}

export interface AutonomousBusinessEngineConfig {
  id: BusinessEngineType;
  title: string;
  codename: string;
  tagline: string;
  activeStatus: 'ACTIVE_OPTIMIZING' | 'STANDBY' | 'THROTTLED';
  pillarsCovered: RevenuePillarId[];
  computeAllocationPct: number; // e.g. 35%
  verifiedClearedRevenue: number;
  pendingEscrow: number;
  projectedAnnualRunRate: number;
  revenueModel: 'VARIABLE_UPSIDE' | 'FIXED_CONTRACT' | 'PREDICTABLE_RECURRING' | 'INFRASTRUCTURE_USAGE';
  activeAgentsAssigned: string[];
  keyPerformanceMetrics: { [key: string]: string | number };
}

export interface ComputeEconomicsModel {
  grossHourlyComputeCost: number;
  electricityCostPerHour: number;
  hardwareDepreciationPerHour: number;
  bandwidthCostPerHour: number;
  aiInferenceCostPerHour: number;
  monetizedMarketplaceYieldPerHour: number;
  netHourlyReturn: number; // monetizedYield - (electricity + depreciation + bandwidth + aiCost)
  efficiencyRatio: number;
}

export interface AutonomousReinvestmentPlan {
  reinvestInHighEnvComputePct: number; // e.g. 40%
  reserveTreasuryHoldPct: number;      // e.g. 25%
  sandboxInfrastructurePct: number;   // e.g. 20%
  modelTrainingAndFeedsPct: number;    // e.g. 15%
  autoExecuteOnSettlement: boolean;
  minSettlementThresholdUsd: number;
}


export interface MarketplaceListing {
  id: string;
  title: string;
  category: 'AI Security Audit' | 'Smart Contract Review' | 'API Penetration Test' | 'Cloud IAM Hardening' | 'Zero-Day Vulnerability Advisory';
  provider: string;
  price: number;
  rating: number;
  completedAudits: number;
  deliveryTimeDays: number;
  marketplaceFeePct: number;
  status: 'AVAILABLE' | 'ENGAGED' | 'COMPLETED';
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  category: 'AUTHORIZATION' | 'AGENT_ACTION' | 'SANDBOX' | 'EVIDENCE' | 'PAYMENT' | 'KILL_SWITCH';
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
  actor: string;
  action: string;
  target?: string;
  evidenceHash?: string;
}
