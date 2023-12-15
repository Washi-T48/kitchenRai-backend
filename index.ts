import Express, { Response, Request } from "express";
import config from "./config/config";
import mysql from "mysql2";
import cors from "cors";
const app = Express();

app.use(cors());
app.use(Express.json());
const ServerPORT = config.server.SERVERPORT;

const db = mysql.createConnection({
  host: config.mysql.HOST,
  port: 3306,
  user: config.mysql.USER,
  password: config.mysql.PASSWORD,
  database: config.mysql.DATABASE,
});

// Connect to the MySQL database
db.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.get("/", (req: Request, res: Response) => {
  db.query("SELECT * FROM tables", (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});

app.get("/tables", (req: Request, res: Response) => {
  db.query("SELECT * FROM tables", (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.setHeader("Content-type", "application/json");
      res.json(results);
      console.log(Math.random());
    }
  });
});

app.get("/tables2", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(ServerPORT, () => {
  console.log(`Server is running on port ${ServerPORT}`);
});
