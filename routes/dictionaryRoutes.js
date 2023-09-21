import express from "express";
import {
  getAllWords,
  getWordByEnglishOrGeorgian,
  getWordsByLanguage,
  checkForDuplicates,
  removeDuplicateWords,
  getAllVerbs,
} from "../controllers/dictionaryContollers.js";
const dictionaryRouter = express.Router();

dictionaryRouter.get("/words", getAllWords);
dictionaryRouter.get("/checkForDuplicates", checkForDuplicates);
dictionaryRouter.get("/removeDuplicateWords", removeDuplicateWords);

dictionaryRouter.get("/words/:language/:query", getWordsByLanguage);
dictionaryRouter.get(
  "/words/translation/:translation",
  getWordByEnglishOrGeorgian
);
dictionaryRouter.get("/words/verbs", getAllVerbs);

export default dictionaryRouter;
