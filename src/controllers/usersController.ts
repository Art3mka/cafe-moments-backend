import { Request, Response } from "express";
import { AddressesSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "../app";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";

export const createAddress = async (req: Request, res: Response) => {
  AddressesSchema.parse(req.body);

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  const addressId = +req.params.id;
  try {
    const deletedAddress = await prismaClient.address.delete({
      where: {
        id: addressId,
      },
    });
    res.json(deletedAddress);
  } catch (error) {
    console.log(error);
    throw new NotFoundException(
      "Address not found.",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};

export const getAllAddresses = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: { userId: req.user?.id },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(
        "Address not found.",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAddress.userId != req.user?.id) {
      throw new BadRequestException(
        "Address does not belongs to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }
  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(
        "Address not found.",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (billingAddress.userId != req.user?.id) {
      throw new BadRequestException(
        "Address does not belongs to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }
  const updatedUser = await prismaClient.user.update({
    where: { id: req.user?.id },
    data: {
      name: validatedData.name!,
      defaultBillingAddress: validatedData.defaultBillingAddress,
      defaultShippingAddress: validatedData.defaultShippingAddress,
    },
  });
  res.json(updatedUser);
};
