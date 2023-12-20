import config from "../config/config";
import mysql from "mysql2";

export default class Menu {
  private menu_id: number = -1;
  private name: string = "";
  private unit: string = "";
  private price: number = -1;

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

  public async getDetails(menu_id: number) {
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
      this.db.query(
        `SELECT * FROM menu WHERE menu_id = ${menu_id}`,
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

  public async addMenu(name: string, unit: string, price: number) {
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
      this.db.query(
        `INSERT INTO menu (name, unit, price) VALUES ("${name}", "${unit}", "${price}")`,
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

  public async closeConnection() {
    await new Promise<void>((resolve, reject) => {
      this.db.end((error) => {
        if (error) {
          console.error("Error closing connection:", error);
          reject(error);
        } else {
          console.log("Connection closed");
          resolve();
        }
      });
    });
  }
}
