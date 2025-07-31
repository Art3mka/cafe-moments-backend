import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  updateUser,
} from "../controllers/usersController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";

export const userRouter: Router = Router();

userRouter.post("/address", [isAuth], errorHandler(createAddress));

userRouter.delete("address/:id", [isAuth], errorHandler(deleteAddress));

userRouter.get("address/", [isAuth], errorHandler(getAllAddresses));

userRouter.put("/", [isAuth], errorHandler(updateUser));
