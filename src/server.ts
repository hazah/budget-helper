/* eslint-disable @typescript-eslint/no-empty-function */
import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import passport from "passport";
import { v4 as uuid } from "uuid";

import { application, authentication } from "middleware";

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
  .use(
    session({
      secret: uuid(),
      resave: false,
      saveUninitialized: false,
    })
  )
  // .post("/login", authentication)
  .use(application);

export default server;
