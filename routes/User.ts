import express, { Request, Response } from "express";
import authentication from "../auth/Authentication";
const router = express.Router();

router.get("/validate", authentication.validateUser);
router.post("/register", authentication.register);
router.post("/login", authentication.login);
router.post("/logout", authentication.logout);
router.get("/all", authentication.getAllUsers);

module.exports = router;
