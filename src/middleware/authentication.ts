import express, { NextFunction, Router } from "express";
import passport from "passport";
import AuthenticationError from "passport/lib/errors/authenticationerror";
import { Strategy } from "passport-strategy";

import { createFetchRequest } from "renderServer";
import { renderApp, renderDocument } from "rendering";
import { application } from "middleware/application";

class ReactRouterStrategy extends Strategy {
  public readonly name: string = "react";
  public authenticate(req: express.Request, options?: any): void {
    this._implementation(req, options);
  }

  private async _implementation(
    req: express.Request,
    options?: any
  ): Promise<void> {
    options = options || {};
    try {
      const request = createFetchRequest(req);
      const result = await renderApp(request);
      const { context } = result;

      req.markup = renderDocument(result);

      if (context.statusCode !== 201) {
        this.fail(undefined);
      } else {
        this.success({
          data: context.actionData,
          statusCode: context.statusCode,
        });
      }
    } catch (err) {
      this.error(err);
    }
  }
}

passport.use(new ReactRouterStrategy());

passport.serializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

passport.deserializeUser((user, done) =>
  process.nextTick(() => done(null, user as Express.User))
);

const authentication = Router()
  .use(passport.authenticate("session"))
  .get("/login", application)
  .post(
    "/login",
    passport.authenticate("react", { failWithError: true }),
    (req, res) => {
      res.status(req.user.statusCode);
      res.format({
        html: () => res.send(req.markup),
        json: () => res.json(req.user.data),
      });
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
