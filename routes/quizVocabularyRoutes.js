import express from "express";
import {
  getQuizData,
  getQuizTopicNames,
  deleteWord,
} from "../controllers/quizVocabulary.js";
const quizVocabularyRouter = express.Router();

quizVocabularyRouter.get("/quiz-topic/:index", getQuizData);
quizVocabularyRouter.get("/quiz-topic-names", getQuizTopicNames);
quizVocabularyRouter.delete("/quiz-topic/:id/:index", deleteWord);

export default quizVocabularyRouter;
