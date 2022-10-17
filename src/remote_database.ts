import PouchDB from "pouchdb";
import find from "pouchdb-find";
import rel from "relational-pouch";

PouchDB.plugin(find).plugin(rel);

const userDatabaseUrl = new URL(process.env.DATABASE_URL);
const HTTPDatabase = PouchDB.defaults({
  prefix: userDatabaseUrl.href,
});

export default HTTPDatabase;
