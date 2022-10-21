import express, { NextFunction } from "express";

export function logout(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  next();
}
