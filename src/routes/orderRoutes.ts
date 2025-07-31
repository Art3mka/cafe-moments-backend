import { Router } from "express";
import {
  changeStatus,
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  listAllOrders,
} from "../controllers/ordersController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";

export const ordersRouter: Router = Router();

ordersRouter.post("/", [isAuth], errorHandler(createOrder));

ordersRouter.get("/", [isAuth], errorHandler(getAllOrders));

ordersRouter.delete("/:id", [isAuth], errorHandler(deleteOrder));

ordersRouter.get("/:id", [isAuth], errorHandler(getOrderById));

ordersRouter.get("/index", [isAuth, isAdmin], errorHandler(listAllOrders));

ordersRouter.get("/users/:id", [isAuth], errorHandler(getUserOrders));

ordersRouter.put("/:id/status", [isAuth], errorHandler(changeStatus));
