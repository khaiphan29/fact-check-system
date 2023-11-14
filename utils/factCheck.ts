export async function quickCheckClaim(
  request: FactCheckRequest
): Promise<Response> {
  try {
    const res: Response = await fetch("/api/fact-check", {
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
    
    return res;
  } catch (e) {
    console.log("Internal Fetch Error", e);
    throw new Error("Claim Submission Error");
  }
}