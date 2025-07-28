import { Router } from "express";
import { createProduct } from "../controllers/productsController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";

export const productRouter: Router = Router();

productRouter.post("/", [isAuth, isAdmin], errorHandler(createProduct));
