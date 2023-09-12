import {
  registerUser,
  updateUser,
} from "../../controllers/userContrller/userController.js";
import {
  loginUser,
  logoutUser,
} from "../../controllers/userContrller/authController.js";
import { loginValidator, registerValidator } from "../../utils/vaidations.js";
import validationErrors from "../../utils/validationErrors.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validationErrors, registerUser);
authRouter.post("/auth/update-username", updateUser);
authRouter.post("/auth/login", loginValidator, loginUser);
authRouter.post("/auth/logout", logoutUser);

export default authRouter;
