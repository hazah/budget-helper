import express, { NextFunction } from "express";
import { renderApp } from "rendering";
import { createFetchRequest } from "renderServer";

export async function login(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  try {
    const request = createFetchRequest(req);
    const result = await renderApp(request);

    const { context } = result;
    res.status(context.statusCode);
    req.session.user = context.loaderData;

    res.format({
      html: () => res.end(),
      json: () => res.json(req.session.user),
    });
  } catch (err) {
    if (err instanceof Response) {
      res.format({
        html: () => res.end(),
        json: async () => res.status(err.statusCode).json(await err.json()),
      });
    } else {
      next(err);
    }
  }
}
