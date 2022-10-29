import { isServer } from "utils";
import schema from "schema";
import config from "config";

const REMOTE_DATABASE = "database/RemoteDatabase";
const LOCAL_DATABASE = "database/LocalDatabase";
const TEST_DATABASE = "database/TestDatabase";

export default async function database(name: string) {
  const { default: Database } = config.TEST_MODE
    ? await import(TEST_DATABASE)
    : isServer()
    ? await import(REMOTE_DATABASE)
    : await import(LOCAL_DATABASE);

  const base_database = new Database(name);
  const database = base_database.setSchema(schema);

  await database.info();

  if (config.TEST_MODE) {
    // seed test data
    const { default: data } = await import("test_data");

    console.debug(data);
  }

  return database;
}
