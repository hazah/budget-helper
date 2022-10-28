import remoteLogin from "services/remoteLogin";

export async function createLogin({ request }: { request: Request }) {
  try {
    return remoteLogin(request);
  } catch (err) {
    throw new Response(err.reason, {
      status: err.status,
    });
  }
}
