import express from "express";
import {
  getAllWords,
  getWordByEnglishOrGeorgian,
  getWordsByLanguage,
} from "../controllers/dictionaryContollers.js";
const dictionaryRouter = express.Router();

dictionaryRouter.get("/words", getAllWords);
dictionaryRouter.get("/words/:language/:query", getWordsByLanguage);
dictionaryRouter.get(
  "/words/translation/:translation",
  getWordByEnglishOrGeorgian
);

export default dictionaryRouter;
