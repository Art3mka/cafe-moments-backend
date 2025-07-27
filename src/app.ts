import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 1207;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
