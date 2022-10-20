import express, { NextFunction } from "express";
import { createFetchRequest } from "renderServer";
import { renderApp, renderDocument } from "rendering";

export { passport } from "middleware/password";

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

export async function appMiddleware(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const request = createFetchRequest(req);
    const result = await renderApp(request);

    const { context } = result;
    res.status(context.statusCode);

    res.format({
      html: () => res.send(renderDocument(result)),
      json: () =>
        res.json(
          context.statusCode === 200
            ? context.loaderData
            : JSON.parse(context.errors[0].data)
        ),
    });
  } catch (err) {
    if (err instanceof Response) {
      const response: Response = err;
      const origin = `${req.protocol}://${req.get("host")}`;
      const url = new URL(response.headers.get("location"), origin);

      if (response.status === 302) {
        res.format({
          html: () => res.redirect(response.status, url.href),
          json: async () => {
            try {
              const request: Request = new Request(url.href);
              const result = await renderApp(request);

              const { context } = result;

              res.status(req.method === "POST" ? 201 : 200);
              res.json(context.loaderData);
            } catch (err) {
              next(err);
            }
          },
        });
      } else {
        next(err);
      }
    } else {
      next(err);
    }
  }
}
