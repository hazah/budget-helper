import express, { NextFunction } from "express";
import { createFetchRequest, _renderData, _renderDocument } from "renderServer";
import { renderApp, renderDocument } from "rendering";

export function _application(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  res.format({
    html: async () => {
      try {
        const response = await _renderDocument(createFetchRequest(req));

        const reader = response.body.getReader();

        res.status(response.status);
        response.headers.forEach((value, name) => res.setHeader(name, value));

        reader.read().then(function send({ done, value }) {
          if (done) {
            res.end();
            return;
          }
          res.write(value);
          reader.read().then(send);
        });
      } catch (err) {
        next(err);
      }
    },
    json: async () => {
      try {
        const response = await _renderData(createFetchRequest(req));

        const reader = response.body.getReader();

        res.status(response.status);
        response.headers.forEach((value, name) => res.setHeader(name, value));

        reader.read().then(function send({ done, value }) {
          if (done) {
            res.end();
            return;
          }
          res.write(value);
          reader.read().then(send);
        });
      } catch (err) {
        next(err);
      }
    },
  });
}

export async function application(
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
