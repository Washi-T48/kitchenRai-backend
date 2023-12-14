import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import signJWT from "../functions/signJWT";
import { Connect, Query } from "../config/mysql";
import interfaceUser from "../interfaces/User";
import intefaceMySQLResult from "../interfaces/Result";
import interfaceMySQLResult from "../interfaces/Result";
import { connect } from "http2";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Authorized" });
};

const register = (req: Request, res: Response) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res
        .status(500)
        .json({ message: hashError.message, error: hashError });
    }

    let query = `INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`;
    Connect()
      .then((connection) => {
        Query<interfaceMySQLResult>(connection, query)
          .then((result) => {
            return res.status(201).json({ result });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message, error });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  });
};

const login = (req: Request, res: Response) => {
  let { username, password } = req.body;

  let query = `SELECT * FROM users WHERE username = '${username}'`;

  Connect().then((connection) => {
    Query<interfaceUser[]>(connection, query)
      .then((users) => {
        bcryptjs
          .compare(password, users[0].password, (error, result) => {
            if (error) {
              return res.status(401).json({
                message: error.message,
                error,
              });
            } else if (result) {
              signJWT(users[0], (_error, token) => {
                if (_error) {
                  return res.status(401).json({
                    message: _error.message,
                    error: _error,
                  });
                } else if (token) {
                  return res.status(200).json({
                    message: "Auth successful",
                    token,
                    user: users[0],
                  });
                }
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message, error });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  });
};

const logout = (req: Request, res: Response) => {};

const getAllUsers = (req: Request, res: Response) => {
  let query = `SELECT _id, username FROM users`;
  Connect()
      .then((connection) => {
        Query<interfaceUser>(connection, query)
          .then((result) => {
            return res.status(201).json({ result });
          })
          .catch((error) => {
            return res.status(500).json({ message: error.message, error });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
};

export default { validateUser, register, login, logout, getAllUsers };
