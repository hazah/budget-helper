// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

export declare global {
  declare module "*.svg" {
    const src: string;
    export default src;
  }

  interface Window {
    data: any;
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
