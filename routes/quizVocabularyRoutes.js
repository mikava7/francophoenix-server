import express from "express";
import { getQuizData } from "../controllers/quizVocabulary.js";
const quizVocabularyRouter = express.Router();

quizVocabularyRouter.get("/quiz-vocabulary-data", getQuizData);

export default quizVocabularyRouter;
