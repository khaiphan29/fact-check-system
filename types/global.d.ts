interface FactCheckResquest { 
    email: string;
    isQuick: boolean;
    groupId: number;
    claim: string;
}

interface FactCheckResponse {
    label_code: number;
    evidence: string;
    claim: string;
    url: string;
    provider: string;
    groupId: number
}

interface AIRquest {
    claim: string
}

interface AIResponse {
    claim: string,
    evidence: string,
    label_code: number
}