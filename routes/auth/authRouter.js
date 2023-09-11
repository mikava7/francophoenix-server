import {
  registerUser,
  updateUser,
} from "../../controllers/userContrller/userController.js";
import {
  loginUser,
  logoutUser,
} from "../../controllers/userContrller/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/auth/update-username", updateUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/logout", logoutUser);

export default authRouter;
