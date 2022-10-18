import express, { NextFunction } from "express";
import { RouteMatch, matchRoutes, RouteObject, Params } from "react-router-dom";
import { createFetchRequest } from "renderServer";
import routes from "routes";

type Data<Type extends Params = Params> = {
  -readonly [Property in keyof Type]: Type[Property];
};

export { passport } from "middleware/password";

export function loadParam(endpoint: string) {
  return async (
    req: express.Request,
    res: express.Response,
    next: NextFunction,
    value: any,
    name: string
  ) => {
    try {
      const request = createFetchRequest(req);
      const matches: RouteMatch[] = matchRoutes(routes, endpoint);

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

      let data: Data;

      if (response) {
        data = await response.json();
        const modelName = name.substring(0, name.length - 3);
        res.locals[modelName] = res.locals[modelName] || {};
        res.locals[modelName][value] = data;
      }
      return next();
    } catch (err) {
      next(err);
    }
  };
}

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
        res.render("app");
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

              res.status(response.status);
              res.json(await response.json());
            } else {
              next();
            }
          } else {
            res.json(await response.json());
            res.status(response.status);
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
      html: () => res.render("app"),
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
        const data = {};

        Object.keys(params).forEach(key => {
          const modelName = key.substring(0, key.length - 3);
          data[modelName] = res.locals[modelName][params[key]];
        });

        const { loader } = route;
        let response: Response;

        if (loader) {
          response = await loader({ request, params });
          if (route.index && route.id) {
            data[route.id] = await response.json();
          }
          res.status(response.status);
          res.json(data);
        } else {
          next();
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
    html: () => res.render("app"),
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
