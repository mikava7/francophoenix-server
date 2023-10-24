import express from "express";
import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";
import {
  getPresentTenseVerbs,
  getVerbExercise,
  getVerbList,
} from "../../controllers/verbeTenseContollers/verbTenseControllers.js";
import { submitExercise } from "../../controllers/userProgress/userProgressController.js";
const verbTenseRouter = express.Router();

verbTenseRouter.get("/verbs/tenses/present", getPresentTenseVerbs);
verbTenseRouter.get("/verbs/tenses/:id", getVerbExercise);
verbTenseRouter.get("/verbs/exercise/verb-list", getVerbList);
verbTenseRouter.post("/verbs/progress", submitExercise);

export default verbTenseRouter;
