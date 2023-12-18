import config from "../config/config";
import mysql from "mysql2";

export default class Kitchen {
  private order_id: number = -1;
  private receipt_id: number = -1;
  private menu_id: number = -1;
  private tables_id: number = -1;
  private customer_id: number = -1;
  private created: string = "";
  private served: string = "";
  private isTakeOut: boolean = false;
  private isValid: boolean = true;

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

  public async getAllOrders() {
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
        "SELECT * FROM orders LEFT JOIN menu ON orders.menu_id = menu.menu_id WHERE served IS NULL AND isValid <> 0 ORDER BY created ASC",
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

  public async getDetails(order_id: number) {
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
        `SELECT * FROM orders LEFT JOIN menu ON orders.menu_id = menu.menu_id WHERE orders.order_id = ${order_id}`,
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

  public async handleAddItem(
    receipt_id: number,
    menu_id: number,
    tables_id: number
  ) {
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
        `INSERT INTO receipt (receipt_id) VALUES (${receipt_id}) ON DUPLICATE KEY UPDATE lastUpdate = CURRENT_TIMESTAMP;`,
        (error, results) => {
          if (error) {
            console.error("Error executing query:", error);
            reject(error);
          } else {
            this.addItem(receipt_id, menu_id, tables_id);
            resolve(results);
          }
        }
      );
    });
  }

  public async addItem(receipt_id: number, menu_id: number, tables_id: number) {
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
        `INSERT INTO orders (receipt_id, menu_id, tables_id) VALUES (${receipt_id}, ${menu_id} , ${tables_id})`,
        (error, results) => {
          if (error) {
            console.error("Error executing query:", error);
            reject(error);
          } else {
            this.addItem;
            resolve(results);
          }
        }
      );
    });
  }

  public async serve(order_id: number) {
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
        `UPDATE orders SET served = NOW() WHERE order_id = ${order_id}`,
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

  public async cancel(order_id: number) {
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
        `UPDATE orders SET isValid = 0 WHERE order_id = ${order_id}`,
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

  public async getReceipt(receipt_id: number) {
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
        `SELECT * FROM orders LEFT JOIN menu ON orders.menu_id = menu.menu_id WHERE orders.receipt_id = ${receipt_id} AND isValid <> 0`,
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
