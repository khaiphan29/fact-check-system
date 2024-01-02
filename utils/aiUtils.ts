import { AIResponse } from "@/types/global";

const mockupURL: string = process.env.SERVERHOST+"/api/mockup-fact-check";
const realURL: string = process.env.AI_URL!;

export async function fetchModelResult(claim: string): Promise<AIResponse> {
  try {
    const res: Response = await fetch(realURL, {
      method: "POST",
      signal: AbortSignal.timeout(120000),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claim: claim,
      }),
    });

    if (res.status === 204) {
      const data: AIResponse = {
        claim: "",
        evidence: "",
        final_label: 2,
        provider: "",
        url: ""
      }
      return data
    }
  
    const data: AIResponse = await res.json();
    return data;
  } catch (e) {
    const error = e as Error
    throw new Error(error.message)
  }
  
}
