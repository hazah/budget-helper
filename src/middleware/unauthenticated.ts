import express, { NextFunction } from "express";

export function unauthenticated(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next("route");
}
