import express, { Request, Response } from "express";
import { config } from "./config/config";
const app = express();

app.get("/", (_req: Request, res: Response): void => {
  res.sendStatus(200);
});

app.listen(config.port, (): void => {
  console.log(`Server running on port ${config.port}`);
});
