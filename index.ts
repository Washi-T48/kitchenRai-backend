import Express, { Response, Request } from "express";
import config from "./config/config";
import cors from "cors";
import Table from "./src/table";
import Menu from "./src/menu";
import Kitchen from "./src/kitchen";
const app = Express();

app.use(cors());
app.use(Express.json());
const ServerPORT = config.server.SERVERPORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/tables", async (req: Request, res: Response) => {
  console.log("GET /tables");
  const tempTable = new Table();
  res.json(await tempTable.getAll());
  tempTable.closeConnection();
});

app.get("/tables/:id", async (req: Request, res: Response) => {
  console.log("GET /tables/:id");
  const tempTable = new Table();
  res.json(await tempTable.getDetails(parseInt(req.params.id)));
  tempTable.setID(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/tables/:id/checkin", async (req: Request, res: Response) => {
  console.log("GET /tables/:id/checkin");
  const tempTable = new Table();
  res.json(await tempTable.checkIn(parseInt(req.params.id)));
  tempTable.checkIn(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/tables/:id/checkout", async (req: Request, res: Response) => {
  console.log("GET /tables/:id/checkout");
  const tempTable = new Table();
  res.json(await tempTable.checkOut(parseInt(req.params.id)));
  tempTable.checkOut(parseInt(req.params.id));
  tempTable.closeConnection();
});

app.get("/menu", async (req: Request, res: Response) => {
  console.log("GET /menu");
  const tempMenu = new Menu();
  res.json(await tempMenu.getAll());
  tempMenu.closeConnection();
});

app.get("/menu/:id", async (req: Request, res: Response) => {
  console.log("GET /menu/:id");
  const tempMenu = new Menu();
  res.json(await tempMenu.getDetails(parseInt(req.params.id)));
  tempMenu.closeConnection();
});

app.get("/orders", async (req: Request, res: Response) => {
  console.log("GET /orders");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getAll());
  tempKitchen.closeConnection();
});

app.get("/orders/:id", async (req: Request, res: Response) => {
  console.log("GET /orders/:id");
  const tempKitchen = new Kitchen();
  res.json(await tempKitchen.getDetails(parseInt(req.params.id)));
  tempKitchen.closeConnection();
});

app.listen(ServerPORT, () => {
  console.log(`Server is running on port ${ServerPORT}`);
});
