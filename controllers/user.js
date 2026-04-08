import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const userRegister = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!username) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    roles,
  });
  res.render("login");
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  const isCorrectPassword = bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign({ id: user._id, roles: user.roles }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("Token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });
  res.status(200).json({ message: "User login Successfully", user: user });
};
export const userProfile = async (req, res) => {
  res.status(200).json({ message: "Welcome to admin panel" });
};

