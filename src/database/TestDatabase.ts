import PouchDB from "pouchdb";
import find from "pouchdb-find";
import rel from "relational-pouch";
import authentication from "pouchdb-authentication";

PouchDB.plugin(find).plugin(rel).plugin(authentication);

const TestDatabase = PouchDB.defaults({
  adapter: "memory",
});

export default TestDatabase;
