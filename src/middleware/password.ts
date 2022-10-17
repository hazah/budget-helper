import passport from "passport";
import { Strategy } from "passport-local";

import Database from "remote_database";

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const userDatabase = new Database("_users", { skip_setup: true });
      const response = await userDatabase.logIn(username, password);
      if (response.ok) {
        const { name } = response;
        done(null, { name });
      } else {
        done(null, false);
      }
    } catch (err) {
      switch (err.name) {
        case "unauthorized":
        case "forbidden":
        default:
          console.error("Login Error:", err);
      }
      done(err);
    }
  })
);

passport.serializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

passport.deserializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

export { passport };
