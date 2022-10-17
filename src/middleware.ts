import express, { NextFunction } from "express";
import { RouteMatch, matchRoutes, RouteObject, Params } from "react-router-dom";
import { createFetchRequest } from "renderServer";
import routes from "routes";

export { passport } from "middleware/password";

export async function performAppAction(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const request = createFetchRequest(req);
  const url = new URL(request.url);
  const { pathname } = url;
  const matches: RouteMatch[] = matchRoutes(routes, pathname);

  if (!matches) {
    return next();
  }

  const match: RouteMatch = matches[matches.length - 1];
  const route: RouteObject = match.route;
  const params: Params = match.params;

  const { action } = route;

  if (action) {
    res.format({
      html: () => {
        res.render("app", { req, res });
      },
      json: async () => {
        try {
          const response: Response = await action({ request, params });
          
          if (response.status === 302) {
            const url = `${req.protocol}://${
              req.hostname
            }${response.headers.get("location")}`;
            const request: Request = new Request(url);
            const pathname = new URL(request.url).pathname;
            const matches: RouteMatch[] = matchRoutes(routes, pathname);
            const match: RouteMatch = matches[matches.length - 1];
            const route: RouteObject = match.route;
            const params: Params = match.params;

            const { loader } = route;

            if (loader) {
              const response: Response = await loader({ request, params });
              const json = await response.json();

              res.status(response.status);

              if (json !== null) {
                res.json(json);
              } else {
                res.end();
              }
            } else {
              res.end();
            }
          } else {
            const json = await response.json();

            res.status(response.status);

            if (json !== null) {
              res.json(json);
            } else {
              res.end();
            }
          }
        } catch (err) {
          console.log(err);
          next(err);
        }
      },
    });
  } else {
    next();
  }
}

export async function renderAppResponse(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    res.format({
      html: () => res.render("app", { req, res }),
      json: async () => {
        const request = createFetchRequest(req);
        const url = new URL(request.url);
        const { pathname } = url;
        const matches: RouteMatch[] = matchRoutes(routes, pathname);

        if (!matches) {
          return next();
        }

        const match: RouteMatch = matches[matches.length - 1];
        const route: RouteObject = match.route;
        const params: Params = match.params;

        const { loader } = route;
        let response: Response;

        if (loader) {
          response = await loader({ request, params });
        }

        let data: string;

        if (loader) {
          data = await response.json();
        }

        if (response) {
          res.status(response.status);

          if (data !== null) {
            res.json(data);
          } else {
            res.end();
          }
        } else {
          res.end();
        }
      },
    });
  } catch (err) {
    next(err);
  }
}

export function signup(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}

export function login(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}

export function logout(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}

export function authenticated(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next("route");
}

export function unauthenticated(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next("route");
}

export function notFound(req: express.Request, res: express.Response) {
  res.format({
    html: () => res.render("app", { req, res }),
    json: () => {
      res.status(404).json({
        errors: [
          {
            error: "Not Found",
            message: `Cannot ${req.method} ${req.path}`,
          },
        ],
      });
    },
  });
}

export function serverError(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  res.format({
    html: () => {
      if (err instanceof Response) {
        setupExpressResponse(res, err);
      } else {
        next(err);
      }
    },
    json: () => {
      res.status(500).json({
        errors: [
          {
            error: "Error",
            message: `Unexpected error (${req.method} ${
              req.path
            }): ${JSON.stringify(err)}`,
          },
        ],
      });
    },
  });
}

function setupExpressHeaders(
  responseHeaders: Headers,
  res: express.Response
): void {
  responseHeaders.forEach((value, key) => res.set(key, value));
}

async function setupExpressResponse(
  res: express.Response,
  response: Response
): Promise<void> {
  res.status(response.status);
  setupExpressHeaders(response.headers, res);
  res.send(await response.text());
}
