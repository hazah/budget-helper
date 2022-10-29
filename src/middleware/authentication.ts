import express, { NextFunction, Router } from "express";
import passport from "passport";
import AuthenticationError from "passport/lib/errors/authenticationerror";
import { Strategy } from "passport-strategy";
import { createFetchRequest, renderAuth } from "renderServer";
import { application } from "middleware/application";

class ReactRouterStrategy extends Strategy {
  public readonly name: string = "react";

  public authenticate(req: express.Request, options?: any): void {
    this.implementation(req, options);
  }

  private async implementation(
    req: express.Request,
    options?: any
  ): Promise<void> {
    options = options || {};
    try {
      const result = await renderAuth(createFetchRequest(req));

      const { contextOrData, document } = result;

      let data;
      if ("name" in contextOrData) {
        data = contextOrData;
      } else if ("actionData" in contextOrData) {
        req.markup = document;
        if (contextOrData.actionData) {
          data = contextOrData.actionData.user;
        } else {
          return this.fail(contextOrData.errors[0]);
        }
      }

      this.success(data);
    } catch (err) {
      if (err instanceof Response) {
        return this.fail(undefined);
      }
      this.error(err);
    }
  }
}

passport.use(new ReactRouterStrategy());

passport.serializeUser((user, done) => {
  process.nextTick(() => done(null, user));
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => done(null, user as Express.User));
});

const authentication = Router()
  .use(passport.authenticate("session"))
  .get(
    "/login",
    (req, res, next) => {
      console.log(req.isAuthenticated());
      console.log(req.user);
      if (req.isAuthenticated()) {
        next("route");
      } else {
        next();
      }
    },
    application
  )
  .post(
    "/login",
    passport.authenticate("react", { failWithError: true }),
    (req, res, next) => {
      try {
        res.format({
          html: () => res.send(req.markup),
          json: () => res.json(req.user),
        });
      } catch (err) {
        next(err);
      }
    }
  )
  .use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      if (err instanceof AuthenticationError) {
        res.format({
          html: () => res.send(req.markup),
          json: () => res.json({ message: err.message }),
        });
      } else {
        next(err);
      }
    }
  );

export { authentication };
