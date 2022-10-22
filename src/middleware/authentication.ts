import express from "express";
import passport from "passport";
import { Strategy } from "passport-strategy";
import { createFetchRequest } from "renderServer";
import { renderApp, renderDocument } from "rendering";
// import { Strategy } from "passport-local";

// import Database from "remote_database";

// passport.use(
//   new Strategy(async (username, password, done) => {
//     try {
//       const userDatabase = new Database("_users", { skip_setup: true });
//       const response = await userDatabase.logIn(username, password);
//       if (response.ok) {
//         const { name } = response;
//         done(null, { name });
//       } else {
//         done(null, false);
//       }
//     } catch (err) {
//       switch (err.name) {
//         case "unauthorized":
//         case "forbidden":
//         default:
//           console.error("Login Error:", err);
//       }
//       done(err);
//     }
//   })
// );

class ReactRouterStrategy extends Strategy {
  public readonly name: string = "react";
  public authenticate(req: express.Request, options?: any): void {
    const request = createFetchRequest(req);
    renderApp(request)
      .then(result => {
        const { context } = result;
        // console.debug(context);
        this.error(new Error("stopping here"));
      })
      .catch(this.error);
  }
}

passport.use(new ReactRouterStrategy());

passport.serializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

passport.deserializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

const authentication = [
  passport.authenticate("session"),
  passport.authenticate("react"),
];

export { authentication };
