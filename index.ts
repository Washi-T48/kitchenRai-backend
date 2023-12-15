import Express, { Response, Request } from "express";
import config from "./config/config";
import mysql from "mysql2";
import cors from "cors";
import Table from "./src/table";
import Menu from "./src/menu";
import { timeStamp } from "console";
const app = Express();

app.use(cors());
app.use(Express.json());
const ServerPORT = config.server.SERVERPORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/tables", async (req: Request, res: Response) => {
  const tempTable = new Table();
  res.json(await tempTable.getAll());
});

app.get("/tables/:id", async (req: Request, res: Response) => {
  const tempTable = new Table();
  res.json(await tempTable.getDetails(parseInt(req.params.id)));
  tempTable.setID(parseInt(req.params.id));
});

app.get("/menu", async (req: Request, res: Response) => {
  const tempMenu = new Menu();
  res.json(await tempMenu.getAll());
});

app.listen(ServerPORT, () => {
  console.log(`Server is running on port ${ServerPORT}`);
});
