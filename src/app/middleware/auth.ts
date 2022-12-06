import { jwt_random_key } from "./../../utils/constants";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, jwt_random_key);
    (<any>req).user = decoded;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  return next();
}
