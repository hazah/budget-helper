import find from "pouchdb-find";
import rel from "relational-pouch";

PouchDB.plugin(find).plugin(rel);

const LocalDatabase = PouchDB.defaults({});

export default LocalDatabase;
