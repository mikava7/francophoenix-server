import express from "express";
import {
  getAllWords,
  getWordsByFrench,
  getWordByEnglishOrGeorgian,
} from "../controllers/dictionaryContollers.js";
const dictionaryRouter = express.Router();

dictionaryRouter.get("/words", getAllWords);
dictionaryRouter.get("/words/french/:french", getWordsByFrench);
dictionaryRouter.get(
  "/words/translation/:translation",
  getWordByEnglishOrGeorgian
);

export default dictionaryRouter;
