import { isClient, isServer } from "utils";
import HTTPDatabase from "remote_database";

export default class Authentication {
  private remoteDatabase: PouchDB.Database<{}>;
  private sync: PouchDB.Replication.Sync<{}>;
  private database: PouchDB.Database<{}>;
  private user: any = null;

  public constructor(
    private config: { user: any } | { database: PouchDB.Database<{}> }
  ) {
    if ("user" in this.config && isServer()) {
      this.user = this.config.user;
    }
    if ("database" in this.config && isClient()) {
      this.database = this.config.database;
    }
  }

  public async logIn(username: string, password: string): Promise<void> {
    if (this.user !== null) return;

    const { userDatabase } = this;

    try {
      const response = await userDatabase.logIn(username, password);
      if (response.ok) {
        if (this.sync !== null) {
          this.sync.cancel();
        }
        if (this.remoteDatabase !== null) {
          this.remoteDatabase.close();
        }

        const { name } = response;

        if (isClient()) {
          this.remoteDatabase = new HTTPDatabase(process.env.DATABASE_NAME, {
            auth: {
              username: username,
              password: password,
            },
          });

          this.sync = this.database.sync(this.remoteDatabase, {
            retry: true,
            live: true,
          });
        }

        this.user = { name };
      }
    } catch (err) {
      switch (err.name) {
        case "unauthorized":
        case "forbidden":
        default:
          console.error("Login Error:", err);
      }
    } finally {
      userDatabase.close();
    }
  }

  public async logOut(): Promise<void> {
    if (this.user === null) return;

    const { userDatabase } = this;

    try {
      const response = userDatabase.logOut();

      if (response.ok) {
        if (this.sync !== null) {
          this.sync.cancel();
        }
        if (this.remoteDatabase !== null) {
          this.remoteDatabase.close();
        }
        this.sync = null;
        this.user = null;
      }
    } catch (err) {
      console.error("Login Error:", err);
    } finally {
      userDatabase.close();
    }
  }

  public get loggedIn(): boolean {
    return this.user !== null;
  }

  private get userDatabase(): PouchDB.Database<{}> {
    return new HTTPDatabase("_users", { skip_setup: true });
  }
}
