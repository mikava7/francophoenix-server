import { trackDownloadController } from "../../controllers/userProgress/userProgressController.js";
import express from "express";

const userProgressRouter = express.Router();

userProgressRouter.post("/auth/progress/downloads", trackDownloadController);

export default userProgressRouter;
