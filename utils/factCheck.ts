import { EvidenceSourcesRequest, FactCheckGroupRequest, FactCheckRequest, GroupResultRequest, SingleClaimRequest } from "@/types/global";

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
    throw new Error("Lỗi khi gửi nhận định");
  }
}

export async function getFactCheckGroup(
  request: FactCheckGroupRequest
): Promise<Response> {
  try {
    const res: Response = await fetch("/api/fact-check-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: request.email,
      }),
    });

    return res;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}

export async function getGroupResult(request: GroupResultRequest): Promise<Response> {
  try {
    const res = await fetch("/api/get-group-claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    return res;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}

export async function getSingleClaim(request: SingleClaimRequest): Promise<Response> {
  try {
    const res = await fetch("/api/get-single-claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    return res;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}


export async function getEvidenceSources(request: EvidenceSourcesRequest): Promise<Response> {
  try {
    const res = await fetch("/api/get-evidence-source", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
      }),
    });

    return res;
  } catch (e) {
    const error = e as Error;
    throw new Error(error.message);
  }
}