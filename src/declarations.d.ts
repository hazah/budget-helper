// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

export declare global {
  declare module "*.svg" {
    const src: string;
    export default src;
  }
  declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

  interface Window {
    env: {
      DATABASE_NAME: string;
      DATABASE_URL: string;
      TEST_MODE: number;
    };
  }

  namespace Express {
    interface User {
      [key: string]: any;
    }

    interface Request {
      markup?: string;
    }
  }

  namespace PouchDB {
    interface Database {
      putSecurity(doc, cb?);
      useAsAuthenticationDB();
      signUp(name: string, password: string);
      logIn(name: string, password: string);
      logOut();
      session();
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
