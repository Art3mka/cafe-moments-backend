import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CartItem, Product } from "@prisma/client";
import { prismaClient } from "../app";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const addToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new NotFoundException(
      "Product not Found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  try {
    const existingCartItem = await prismaClient.cartItem.findFirst({
      where: {
        userId: req.user?.id,
        productId: product.id,
      },
    });
    if (existingCartItem) {
      const updatedCartItem = await prismaClient.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + validatedData.quantity },
      });
      return res.json(updatedCartItem);
    }

    const newCartItem = await prismaClient.cartItem.create({
      data: {
        userId: req.user?.id!,
        productId: product.id,
        quantity: validatedData.quantity,
      },
    });
    res.json(newCartItem);
  } catch (error) {
    console.log(error);
    throw new NotFoundException("Cart not Found", ErrorCode.CART_NOT_FOUND);
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    if (product.userId !== req.user?.id) {
      throw new UnauthorizedException(
        "You can't delete this product.",
        ErrorCode.UNAUTHORIZED
      );
    }

    const deletedProduct = await prismaClient.cartItem.delete({
      where: {
        id: product.id,
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    throw new NotFoundException(
      "Product not Found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
