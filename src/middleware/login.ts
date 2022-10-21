import express, { NextFunction } from "express";

export function login(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}
