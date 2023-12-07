import express from "express";
import {
  clearWeakWords,
  clearGlobalWeakWords,
} from "../../controllers/userProgress/userProgressController.js";

const vocabularyProgressRouter = express.Router();

vocabularyProgressRouter.post("/vocabulary/clearWeakWords", clearWeakWords);
vocabularyProgressRouter.post(
  "/vocabulary/clearGlobalWeakWords",
  clearGlobalWeakWords
);

export default vocabularyProgressRouter;
