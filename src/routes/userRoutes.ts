import { Router } from "express";
import {
  changeUserRole,
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";

export const userRouter: Router = Router();

userRouter.post("/address", [isAuth], errorHandler(createAddress));

userRouter.delete("address/:id", [isAuth], errorHandler(deleteAddress));

userRouter.get("address/", [isAuth], errorHandler(getAllAddresses));

userRouter.put("/", [isAuth], errorHandler(updateUser));

userRouter.put("/:id/role", [isAuth, isAdmin], errorHandler(changeUserRole));
userRouter.get("/", [isAuth, isAdmin], errorHandler(getAllUsers));
userRouter.get("/:id", [isAuth, isAdmin], errorHandler(getUserById));
