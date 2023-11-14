export const fetchRegistry = async (
  values: RegisterRequest
): Promise<Response> => {
  console.log(`Fetching... /api/register`);

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
