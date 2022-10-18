/* eslint-disable @typescript-eslint/no-empty-function */
import express, { NextFunction, Router } from "express";
import { v4 as uuid } from "uuid";
import morgan from "morgan";
import session from "express-session";
import methodOverride from "method-override";
import { RouteObject } from "react-router-dom";

import {
  renderAppResponse,
  performAppAction,
  authenticated,
  logout,
  unauthenticated,
  signup,
  login,
  notFound,
  serverError,
  passport,
  loadParam,
} from "middleware";
import { render } from "server_rendering";

import routes from "routes";

function createServerRouter(routes: RouteObject[]) {
  const router = Router();

  function _createRouter(routes: RouteObject[], prefix: string = null) {
    routes.forEach(options => {
      if (!options.path && !options.index) {
        _createRouter(options.children, prefix);
      } else {
        const endpoint = `${prefix ? `${prefix}` : "/"}${
          options.index
            ? ""
            : `${
                options.path == "/"
                  ? ""
                  : `${prefix && prefix !== "/" ? "/" : ""}${options.path}`
              }`
        }`;

        if (options.path && options.path.startsWith(":")) {
          const param = options.path.substring(1);

          router.param(param, loadParam(endpoint));
        }

        if (options.children) {
          _createRouter(options.children, endpoint);
        } else {
          const route = router.route(endpoint);
          route
            .get(renderAppResponse)
            .post(performAppAction)
            .put(performAppAction)
            .patch(performAppAction)
            .delete(performAppAction);
        }
      }
    });
  }

  _createRouter(routes);

  return router;
}

const authenticatedRouter = Router();
const unauthenticatedRouter = Router();

authenticatedRouter.route("/").all(authenticated).delete(logout);

unauthenticatedRouter
  .route("/")
  .all(unauthenticated)
  .post(signup, passport.authenticate("local"), login)
  .put(passport.authenticate("local"), login)
  .patch(passport.authenticate("local"), login);

const server = express()
  .disable("x-powered-by")
  .use(morgan("dev"))

  .set("view engine", "ts")
  .set("views", "src/")
  .engine("ts", render)

  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(express.urlencoded({}))
  .use(express.json())
  .use(
    methodOverride(req => {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  )
  .use(
    session({
      secret: uuid(),
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.authenticate("session"))
  .use(unauthenticatedRouter)
  .use(authenticatedRouter)
  .use((req: express.Request, res: express.Response, next: NextFunction) => {
    res.locals.req = req;
    res.locals.res = res;
    next();
  })
  .use(createServerRouter(routes))
  .use(notFound)
  .use(serverError);

export default server;
