import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../app";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized.", ErrorCode.UNAUTHORIZED)
    );
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      userId: number;
    };

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized.", ErrorCode.UNAUTHORIZED)
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(new UnauthorizedException("Unauthorized.", ErrorCode.UNAUTHORIZED));
  }
};
