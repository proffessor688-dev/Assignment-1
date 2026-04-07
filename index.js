import express from "express";
import connectDB from "./utils/db.js";

const app = express();
const PORT = 5000;

connectDB();

app.get("/", (req, res) => {
  res.status(200).send({message:'Server Running Succesfully'});
});

app.listen(PORT, () => {
  console.log(`Server Runing at ${PORT}`);
});
