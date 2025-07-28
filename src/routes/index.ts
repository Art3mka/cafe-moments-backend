import { Router } from "express";
import { authRouter } from "./authRoutes";
import { productRouter } from "./productRoutes";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/products", productRouter);
