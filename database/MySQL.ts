import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MYSQL_HOST);

export default class MySQL {
  private static instance: MySQL;
  private static connection: mysql.Connection;

  private constructor() {
    MySQL.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  public MySQL() {
    return MySQL.connection;
  }
}
