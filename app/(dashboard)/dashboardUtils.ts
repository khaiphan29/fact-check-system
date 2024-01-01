import {
  FactCheckStatisticResponse,
  UsageStatisticResponse,
} from "@/types/global";
import { FactCheck } from "@mui/icons-material";

async function fetchFactCheckStatistics(): Promise<Response> {
  try {
    const res = await fetch("/api/fact-check-statistic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return res;
  } catch (e) {
    throw new Error("Không thể nhận data");
  }
}

async function fetchUsageStatistics(): Promise<Response> {
  try {
    const res = await fetch("/api/usage-statistic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    return res;
  } catch (e) {
    throw new Error("Không thể nhận data");
  }
}

export async function getFactCheckStatistics() {
  const res = await fetchFactCheckStatistics();
  if (res.ok) {
    const data: FactCheckStatisticResponse = await res.json();
    return data;
  }
}

export async function getUsageStatistics() {
  const res = await fetchUsageStatistics();
  if (res.ok) {
    console.log("Get us stat");
    const data: UsageStatisticResponse = await res.json();
    return data;
  }
}
