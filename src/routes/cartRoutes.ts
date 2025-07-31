import { Router } from "express";
import {
  addToCart,
  getCart,
  deleteFromCart,
  changeQuantity,
} from "../controllers/cartController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";

export const cartRouter: Router = Router();

cartRouter.post("/", [isAuth], errorHandler(addToCart));

cartRouter.get("/", [isAuth], errorHandler(getCart));

cartRouter.delete("/:id", [isAuth], errorHandler(deleteFromCart));

cartRouter.put("/:id", [isAuth], errorHandler(changeQuantity));
