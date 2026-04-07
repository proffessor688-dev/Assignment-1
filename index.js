import express from "express";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.js";

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({message:'Server Running Succesfully'});
});
app.use('/api/auth',userRouter);
app.use('/api/auth',userRouter);

app.listen(PORT, () => {
  console.log(`Server Runing at ${PORT}`);
});
