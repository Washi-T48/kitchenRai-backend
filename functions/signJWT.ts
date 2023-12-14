import jwt from "jsonwebtoken";
import config from "../config/config";
import interfaceUser from "../interfaces/User";
import { error } from "console";

const NAMESPACE = "Auth";

const signJWT = (
  user: interfaceUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  var timesinceepoch = new Date().getTime();
  var expirationtime =
    timesinceepoch + Number(config.server.token.expireTime) * 100000;
  var expirationtimeInSeconds = Math.floor(expirationtime / 1000);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      config.server.token.secret,
      {
        algorithm: "HS256",
        expiresIn: expirationtimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export default signJWT;
