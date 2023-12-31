export function notFoundResponse() {
    return new Response(
      JSON.stringify({
        msg: "Không xác định người dùng hoặc nhóm tin",
      }),
      {
        status: 404,
      }
    );
  }