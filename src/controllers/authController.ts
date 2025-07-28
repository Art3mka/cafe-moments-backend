import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../app";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw new NotFoundException(
      "User is not exists!",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET_KEY!
  );
  res.status(200).json({ user, token });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  SignUpSchema.parse(req.body);
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    throw new BadRequestException(
      "User already exists!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.status(201).json(user);
};

export const me = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json(req.user);
};
