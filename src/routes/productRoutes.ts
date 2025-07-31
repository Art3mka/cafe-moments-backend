import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from "../controllers/productsController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";
import { isAdmin } from "../middleware/isAdmin";

export const productRouter: Router = Router();

productRouter.post("/", [isAuth, isAdmin], errorHandler(createProduct));

productRouter.put("/:id", [isAuth, isAdmin], errorHandler(updateProduct));

productRouter.delete("/:id", [isAuth, isAdmin], errorHandler(deleteProduct));

productRouter.get("/", [isAuth, isAdmin], errorHandler(getAllProducts));

productRouter.get("/:id", [isAuth, isAdmin], errorHandler(getProductById));

productRouter.get("/search", [isAuth, isAdmin], errorHandler(searchProducts));
