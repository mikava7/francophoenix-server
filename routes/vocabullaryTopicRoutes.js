import express from "express";
import { getVocabularyTopics } from "../controllers/vocabullaryTopicsContollers.js";

const vocaBullaryTopicRoute = express.Router();
vocaBullaryTopicRoute.get("/vocabulary-topics", getVocabularyTopics);
// vocaBullaryTopicRoute.get("/vocabulary2", getVocabularyTopics);

export default vocaBullaryTopicRoute;
