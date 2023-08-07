import { getBasicGrammerLessons } from "../../controllers/grammerControllers/grammerController.js";
import express from "express";

const grammerRouter = express.Router();

grammerRouter.get("/grammer/basic-grammer", getBasicGrammerLessons);

export default grammerRouter;
