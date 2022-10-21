import express, { NextFunction } from "express";

export function signup(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}
