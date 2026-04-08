import express from "express";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.use('/api/auth',userRouter);


app.listen(PORT, () => {
  console.log(`Server Runing at ${PORT}`);
});
