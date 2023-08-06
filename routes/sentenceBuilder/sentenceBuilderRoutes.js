import { getAllSentences } from "../../controllers/sentencBuilderController.js";
import express from "express";

const sentenceBuilderRouter = express.Router();

sentenceBuilderRouter.get("/sentences/general", getAllSentences);
export default sentenceBuilderRouter;
