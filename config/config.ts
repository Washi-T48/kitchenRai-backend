import dotenv from "dotenv";
dotenv.config();

const SERVER = {
  HOSTNAME: process.env.SERVER_HOSTNAME || "localhost",
  SERVERPORT: process.env.SERVER_PORT || 3000,
  HOSTNAMEPORT: process.env.SERVER_HOSTNAME || "localhost:3000",
};

const AUTH = {
  SECRET: process.env.SERVER_SECRET || "secret",
};

const MYSQL = {
  HOST: process.env.MYSQL_HOST || "localhost:3306",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "root",
  DATABASE: process.env.MYSQL_DATABASE || "pos",
  PORT: 3306,
};

const MONGODB = {
  HOST: process.env.MONGODB_HOST || "mongodb://localhost:27017/",
};

const config = {
  server: SERVER,
  auth: AUTH,
  mysql: MYSQL,
  mongodb: MONGODB,
};

export default config;
