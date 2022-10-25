import RemoteDatabase from "database/RemoteDatabase";

const userDatabase = new RemoteDatabase("_users", { skip_setup: true })

export default userDatabase;