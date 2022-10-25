import { json } from "react-router-dom";
import userDatabase from "database/userDatabase";
import createService, { returnJson, throwError } from "services/operations";

type LoginType = { username: string; password: string };
type UserType = { ok?: boolean; name?: string };

function getFormData(formData: FormData): LoginType {
  return {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
}

function logIn({ username, password }: LoginType): Promise<UserType> {
  return userDatabase.logIn(username, password);
}

export default async function remoteLogin(request: Request): Promise<Response> {
  return createService({
    formData: await request.formData(),
    getData: getFormData,
    message: "attempting authentication with: ",
    performOperation: logIn,
    condition: response => response.ok,
    returnJson: returnJson({
      transformer: ({ name }) => name,
      message: "logged in as",
      mapper: name => json({ name }, 201),
    }),
    throwError: throwError(),
  });
}
