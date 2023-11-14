const mockupURL: string = process.env.SERVERHOST+"/api/mockup-fact-check";
const realURL: string = process.env.AI_URL!;

export async function fetchModelResult(claim: string): Promise<AIResponse> {
  try {
    const res: Response = await fetch(mockupURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claim: claim,
      }),
    });
  
    const data: AIResponse = await res.json();
    return data;
  } catch (e) {
    const error = e as Error
    throw new Error(error.message)
  }
  
}
