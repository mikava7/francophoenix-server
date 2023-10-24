import express from "express";
import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";
import {
  getPresentTenseVerbs,
  getVerbExercise,
  getVerbList,
} from "../../controllers/verbeTenseContollers/verbTenseControllers.js";
import {
  submitExercise,
  getUserProgress,
} from "../../controllers/userProgress/userProgressController.js";
const verbTenseRouter = express.Router();

verbTenseRouter.get("/verbs/tenses/present", getPresentTenseVerbs);
verbTenseRouter.get("/verbs/tenses/:id", getVerbExercise);
verbTenseRouter.get("/verbs/exercise/verb-list", getVerbList);
verbTenseRouter.post("/verbs/progress", submitExercise);
verbTenseRouter.get("/verbs/:userId", getUserProgress);

export default verbTenseRouter;
