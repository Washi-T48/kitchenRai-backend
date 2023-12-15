import config from "../config/config";
import mysql from "mysql2";

export default class Table {
  private tables_id: number = -1;
  private number: number = -1;
  private location: string = "";
  private capacity: number = -1;
  private available: boolean = false;
  private reserved: boolean = false;

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
      this.db.query("SELECT * FROM tables", (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  public checkOut(id: number) {
    console.log("Table checkout");
    // Add your checkout logic here
  }

  public reserve(id: number, customer_id: number) {
    console.log("Table reserve");
    // Add your reserve logic here
  }

  public async getDetails(id: number) {
    this.tables_id = id;
    return new Promise((resolve, reject) => {
      this.db.query(
        "SELECT * FROM tables WHERE tables_id = ?",
        [id],
        (error, results) => {
          if (error) {
            console.error("Error executing query:", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  public setID(id: number) {
    this.tables_id = id;
    return this.getDetails(id);
  }

  public getID(): number {
    return this.tables_id;
  }
}
