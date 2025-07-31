import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/ordersController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";

export const ordersRouter: Router = Router();

ordersRouter.post("/", [isAuth], errorHandler(createOrder));

ordersRouter.get("/", [isAuth], errorHandler(getAllOrders));

ordersRouter.delete("/:id", [isAuth], errorHandler(deleteOrder));

ordersRouter.get("/:id", [isAuth], errorHandler(getOrderById));
