import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const PORT = process.env.SERVER_PORT || 6969;
const userRoute = require("./routes/User");

app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.post("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
