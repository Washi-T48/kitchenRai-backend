import config from "../config/config";
import mysql from "mysql2";

export default class Menu {
  private order_id: number = -1;
  private receipt_id: number = -1;
  private menu_id: string = "";
  private tables_id: number = -1;
  private customer_id: boolean = false;
  private created: boolean = false;
  private served: boolean = false;
  private isTakeAway: boolean = false;
  private isValid: boolean = false;

  private db: mysql.Connection;

  constructor() {
    this.db = mysql.createConnection({
      host: config.mysql.HOST,
      port: 3306,
      user: config.mysql.USER,
      password: config.mysql.PASSWORD,
      database: config.mysql.DATABASE,
    });

    this.db.connect((error) => {
      if (error) {
        console.error("Error connecting to MySQL database:", error);
      } else {
        console.log("Connected to MySQL database");
      }
    });
  }

  public async getAll() {
    await new Promise<void>((resolve, reject) => {
      this.db.connect((error) => {
        if (error) {
          console.error("Error connecting to MySQL database:", error);
          reject(error);
        } else {
          resolve();
        }
      });
    });

    return new Promise((resolve, reject) => {
      this.db.query("SELECT * FROM menu", (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
