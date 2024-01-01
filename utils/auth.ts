import {
  AccountFormData,
  AccountListRequest,
  GetRoleRequest,
  RegisterRequest,
} from "@/types/global";

export const fetchRegistry = async (
  values: RegisterRequest
): Promise<Response> => {
  // console.log(`Fetching... /api/register`);

  const res = await fetch(`/api/register`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getRole = async (values: GetRoleRequest): Promise<Response> => {
  const res = await fetch(process.env.SERVERHOST + "/api/get-role", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getAccountList = async (
  values: AccountListRequest
): Promise<Response> => {
  const res = await fetch("/api/get-account-list", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const getAccount = async (values: {
  email: string;
}): Promise<Response> => {
  // console.log(`Fetching... /api/register`);

  const res = await fetch(`/api/get-account`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const updateAccount = async (
  values: AccountFormData
): Promise<Response> => {
  // console.log(`Fetching... /api/register`);

  const res = await fetch(`/api/update-account`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return res;
};
