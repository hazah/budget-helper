import express, { NextFunction } from "express";
import { createFetchRequest, renderData, renderDocument } from "renderServer";

export function application(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  res.format({
    html: async () => {
      try {
        const response = await renderDocument(createFetchRequest(req));

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
        const response = await renderData(createFetchRequest(req));

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
