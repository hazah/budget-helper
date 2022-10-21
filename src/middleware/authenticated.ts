import express, { NextFunction } from "express";

export function authenticated(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next("route");
}
