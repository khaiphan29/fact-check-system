export async function checkClaim(
  request: FactCheckRequest
): Promise<FactCheckResponse> {
  try {
    const res: Response = await fetch("/api/mockup-fact-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claim: request.claim,
        email: request.email,
        isQuick: true,
        groupId: -1,
      }),
    });

    const data: FactCheckResponse = await res.json();
    console.log(data);
    
    return data;
  } catch (e) {
    console.log("Internal Fetch Error", e);
    throw new Error("Claim Submission Error");
  }
}
