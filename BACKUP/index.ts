import express, { Request, Response } from "express";
import session from "express-session";
import config from "../config/config";
import { Database } from "sqlite3";
const db = new Database("./config/usersDB.sqlite");

const bcrypt = require("bcrypt");


interface User {
  username: string;
  password: string;
}

const users: User[] = [];

db.all("SELECT username, password FROM users", (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  rows.forEach((row) => {
    const user: User = { username: row.username, password: row.password };
    users.push(user);
  });
});


const app = express();
app.use(express.json());

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user: User = { username: req.body.name, password: hashedPassword };
    users.push(user);
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

app.post("/users/login", async (req: Request, res: Response) => {
  const user = users.find((user) => user.username === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(config.server.PORT, () => {
  console.log(`Server is running on port ${config.server.PORT}`);
});
