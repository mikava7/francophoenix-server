import express from "express";
import {
  getDialogueForLesson,
  getGrammer,
  getDialogueExercise,
  getSentenceBuilder,
  getPhrases,
  getLesson,
} from "../controllers/elementary.js";

const courseRouter = express.Router();

courseRouter.get("/course/elementary/:lessonNumber", getLesson);
courseRouter.get(
  "/course/elementary/dialogues/:lessonNumber",
  getDialogueForLesson
);
courseRouter.get("/course/elementary/grammer/:lessonNumber", getGrammer);

courseRouter.get(
  "/course/elementary/exercise-1/:lessonNumber",
  getDialogueExercise
);

// Get sentence builder
courseRouter.get(
  "/course/elementary/sentence-builder/:lessonNumber",
  getSentenceBuilder
);

// Get phrases
courseRouter.get("/course/elementary/phrases/:lessonNumber", getPhrases);

export default courseRouter;
