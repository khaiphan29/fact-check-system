interface ErrorResponse {
  msg: string
}

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

interface CreateClaimGroupRequest {
  email: string;
  name: string;
}

interface CreateClaimGroupResponse {
  id: number;
  name: string;
}

interface ClaimResultRequest {
  groupId: number;
}

interface ClaimResultResponse {
  results: ClaimResult[];
}

interface ClaimResult {
  id: number;
  rating: number;
  claim: string;
}

// ANCHOR Auth
interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  cpassword: string;
}

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

interface RegisterResponse {
  username: string;
  password: string;
}

// ANCHOR CSS
interface SearchResultCSS {
  background_1: string;
  background_2: string;
  border: string;
}
