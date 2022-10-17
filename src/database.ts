import { isServer } from "utils";
import schema from "schema";

const REMOTE_DATABASE = "remote_database";
const LOCAL_DATABASE = "local_database";

export default async function database(name: string) {
  const { default: Database } = isServer()
    ? await import(REMOTE_DATABASE)
    : await import(LOCAL_DATABASE);

  const base_database = new Database(name);
  const database = base_database.setSchema(schema);

  await database.info();

  return database;
}
