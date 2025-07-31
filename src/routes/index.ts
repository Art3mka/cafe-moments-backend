import { Router } from "express";
import { authRouter } from "./authRoutes";
import { productRouter } from "./productRoutes";
import { userRouter } from "./userRoutes";
import { cartRouter } from "./cartRoutes";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/carts", cartRouter);
