import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

import { rootRouter } from "./routes/";
import { errorMiddleware } from "./middleware/errors";

const PORT = process.env.PORT || 1207;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", rootRouter);

export const prismaClient = new PrismaClient();

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on "http://localhost:${PORT}"`);
});
