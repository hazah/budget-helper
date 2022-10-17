/* eslint-disable @typescript-eslint/no-empty-function */
import express, { Router } from "express";
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
} from "middleware";
import { render } from "server_rendering";

import routes from "routes";

function createServerRouter(routes: RouteObject[], param?: string) {
  const router = Router();

  // routes.forEach(options => {
  //   if (!options.path && !options.index) {
  //     router.use(createServerRouter(options.children, param));
  //   } else {
  //     const endpoint = `/${options.index ? "" : options.path}`;

  //     let currentParam: string = param;
      
  //     if (options.path && options.path.startsWith(":")) {
  //       currentParam = options.path.substring(1);
  //     }

  //     if (options.children) {
  //       router.use(
  //         endpoint,
  //         createServerRouter(options.children, currentParam)
  //       );
  //     } else {
  //       if (currentParam) {
  //         console.debug(endpoint, currentParam)
  //         router.param(currentParam, (req, res, next, val) => {
  //           console.debug(val);
  //         });
  //       }
  //       const route = router.route(endpoint);
  //       route
  //         .get(renderAppResponse)
  //         .post(performAppAction)
  //         .put(performAppAction)
  //         .patch(performAppAction)
  //         .delete(performAppAction);
  //     }
  //   }
  // });

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
  .use(createServerRouter(routes))
  .use(notFound)
  .use(serverError);

export default server;
