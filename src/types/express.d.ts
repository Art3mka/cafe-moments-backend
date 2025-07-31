import { User } from "@prisma/client";
import { Request } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User; // Добавляем поле `user` в Request
//     }
//   }
// }

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
