/* eslint-disable @typescript-eslint/no-empty-function */
import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";

import { appMiddleware } from "middleware";

// const authenticatedRouter = Router();
// const unauthenticatedRouter = Router();

// authenticatedRouter.route("/").all(authenticated).delete(logout);

// unauthenticatedRouter
//   .route("/")
//   .all(unauthenticated)
//   .post(signup, passport.authenticate("local"), login)
//   .put(passport.authenticate("local"), login)
//   .patch(passport.authenticate("local"), login);

const server = express()
  .disable("x-powered-by")
  .use(morgan("dev"))
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
  .use(appMiddleware);
// .use(
//   session({
//     secret: uuid(),
//     resave: false,
//     saveUninitialized: false,
//   })
// )
// .use(passport.authenticate("session"))
// .use(unauthenticatedRouter)
// .use(authenticatedRouter)
// .use(notFound)
// .use(serverError);

export default server;
