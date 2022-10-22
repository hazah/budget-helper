import { json } from "react-router-dom";

export async function createLogin({ request }: { request: Request}) {
  // console.debug("form:", request.body);
  return json({ name: "username" });
}
