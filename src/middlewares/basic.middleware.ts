import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  name: string;
}

export default async function basicMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const verified = jwt.verify(token, process.env.SECRET_JWT);
    const { id } = verified as TokenPayload;

    if (id) {
      return next();
    } else {
      return res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(401);
  }
}
