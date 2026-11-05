export type Severity = 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW';

export type IncidentStatus = 'DETECTED' | 'TRIAGING' | 'IDENTIFIED' | 'MITIGATING' | 'RESOLVED';

export interface IncidentAlert {
  id: string;
  title: string;
  service: string;
  errorMessage: string;
  stackTrace: string;
  severity: Severity;
  timestamp: string;
  source: 'SENTRY' | 'DATADOG' | 'PAGERDUTY' | 'MANUAL';
  environment: 'production' | 'staging';
}

export interface GitCommit {
  hash: string;
  author: string;
  timestamp: string;
  message: string;
  filesChanged: string[];
  diff: string;
}

export interface RootCauseAnalysis {
  incidentId: string;
  culpritCommit?: GitCommit;
  suspectFile: string;
  suspectLineNumber: number;
  explanation: string;
  confidenceScore: number;
  reproductionTestSnippet: string;
  suggestedPatch: string;
}

export interface PullRequestDetails {
  prNumber: number;
  prUrl: string;
  branchName: string;
  title: string;
  description: string;
  diffSummary: string;
  testPassed: boolean;
}

export interface PostMortemReport {
  incidentId: string;
  title: string;
  severity: Severity;
  durationMinutes: number;
  startTime: string;
  resolvedTime: string;
  leadResponder: string;
  impactedUsersCount: number;
  rootCause: string;
  mitigationSteps: string[];
  actionItems: Array<{
    task: string;
    owner: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'TODO' | 'IN_PROGRESS';
  }>;
  markdownContent: string;
}

// Switch Protocol Definitions
export type SwitchPlatform = 'slack' | 'discord' | 'teams' | 'telegram' | 'mattermost' | 'console';

export interface SwitchParticipant {
  id: string;
  name: string;
  role: 'human' | 'agent';
  title?: string;
}

export interface SwitchMessage {
  id: string;
  roomId: string;
  sender: SwitchParticipant;
  text: string;
  timestamp: string;
  platform: SwitchPlatform;
  threadId?: string;
  metadata?: Record<string, any>;
}

export interface SwitchRoomState {
  roomId: string;
  roomName: string;
  participants: SwitchParticipant[];
  incident?: IncidentAlert;
  activeAnalysis?: RootCauseAnalysis;
  activePR?: PullRequestDetails;
  status: IncidentStatus;
}
