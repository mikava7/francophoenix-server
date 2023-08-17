import express from "express";
import {
  getQuizData,
  getQuizTopicNames,
} from "../controllers/quizVocabulary.js";
const quizVocabularyRouter = express.Router();

quizVocabularyRouter.get("/quiz-topic/:index", getQuizData);
quizVocabularyRouter.get("/quiz-topic-names", getQuizTopicNames);

export default quizVocabularyRouter;
