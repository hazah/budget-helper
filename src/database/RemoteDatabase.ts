import PouchDB from "pouchdb";
import find from "pouchdb-find";
import rel from "relational-pouch";
import authentication from "pouchdb-authentication";
import config from "config"

PouchDB.plugin(find).plugin(rel).plugin(authentication);

const RemoteDatabase = PouchDB.defaults({
  prefix: new URL(config.DATABASE_URL).href,
});

export default RemoteDatabase;
