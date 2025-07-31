import { Router } from "express";
import { authRouter } from "./authRoutes";
import { productRouter } from "./productRoutes";
import { userRouter } from "./userRoutes";
import { cartRouter } from "./cartRoutes";
import { ordersRouter } from "./orderRoutes";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/carts", cartRouter);
rootRouter.use("/orders", ordersRouter);
