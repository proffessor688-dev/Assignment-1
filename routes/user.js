import { Router } from "express";
import { userLogin, userRegister, userProfile } from "../controllers/user.js";
import { verifyUser } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authrole.js";
const userRouter = Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.get(
  "/admin",
  verifyUser,
  authorizeRoles(["admin"]),
  userProfile
);

export default userRouter;
