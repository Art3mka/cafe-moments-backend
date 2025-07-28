import { Request, Response } from "express";
import { prismaClient } from "../app";
import { CreateProductSchema } from "../schema/products";

export const createProduct = async (req: Request, res: Response) => {
  //   CreateProductSchema.parse(req.body);
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.json(product);
};
