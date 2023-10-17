interface EvidenceResult {
  claim: string;
  evidence: string;
}

interface FactCheckRequest {
  email: string;
  isQuick: boolean;
  groupId: number;
  claim: string;
}

interface FactCheckResponse {
  final_label: number;
  evidences: EvidenceResult[];
  claim: string;
  url: string;
  provider: string;
  groupId: number;
}

interface AIRquest {
  claim: string;
}

interface AIResponse {
  claim: string;
  evidences: EvidenceResult[];
  final_label: number;
}

// ANCHOR CSS
interface SearchResultCSS {
  background_1: string;
  background_2: string;
  border: string;
}
