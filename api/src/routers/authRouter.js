import express from "express";
import { comparePasswords, hashPassword } from "../utils/password.js";
import { createUser, getUserByUsername } from "../db/userCrud.js";
import { createJWT } from "../utils/jwt.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user_id = await createUser(username, email, hashedPassword);
  const token = createJWT(user_id, username, email);
  res.json({ token });
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = createJWT(user.id, user.username, user.email);
  res.json({ token });
});

authRouter.get("/getUser", authenticateJWT, async (req, res) => {
  // console.log(req.user);
  const user = await getUserByUsername(req.user.username);

  if (!user) {
    return res.status(403);
  }

  const token = createJWT(user.id, user.username, user.email);

  return res.json({ user, token });
});

export default authRouter;

