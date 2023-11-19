import express from "express";
import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";
import {
  getPresentTenseVerbs,
  getVerbExercise,
  getVerbList,
  getExerciseByTense,
} from "../../controllers/verbeTenseContollers/verbTenseControllers.js";
import {
  submitExercise,
  getUserProgress,
  submitVocabularyExercise,
} from "../../controllers/userProgress/userProgressController.js";
const verbTenseRouter = express.Router();

verbTenseRouter.post("/vocabulary/progress", submitVocabularyExercise);
verbTenseRouter.get("/verbs/check-your-knowledge", getExerciseByTense);
verbTenseRouter.get("/verbs/tenses/present", getPresentTenseVerbs);
verbTenseRouter.get("/verbs/tenses/:id", getVerbExercise);
verbTenseRouter.get("/verbs/exercise/verb-list", getVerbList);
verbTenseRouter.post("/verbs/progress", submitExercise);
verbTenseRouter.get("/verbs/:userId", getUserProgress);

export default verbTenseRouter;
