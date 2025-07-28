import { Router } from "express";
import { login, signup, me } from "../controllers/authController";
import { errorHandler } from "../errorHandler";
import { isAuth } from "../middleware/isAuth";

export const authRouter: Router = Router();

authRouter.post("/login", errorHandler(login));

authRouter.post("/signup", errorHandler(signup));

authRouter.get("/me", isAuth, errorHandler(me));
