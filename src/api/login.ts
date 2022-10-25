import remoteLogin from "services/remoteLogin";

export function createLogin({ request }: { request: Request }) {
  try {
    return remoteLogin(request);
  } catch (err) {
    console.debug("authentication failed: ", err.reason);
    throw new Response(err.reason, {
      status: err.status,
    });
  }
}
