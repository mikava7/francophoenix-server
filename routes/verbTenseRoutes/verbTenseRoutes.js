import express from "express";
import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";
import {
  getPresentTenseVerbs,
  getVerbExercise,
} from "../../controllers/verbeTenseContollers/verbTenseControllers.js";
const verbTenseRouter = express.Router();

verbTenseRouter.get("/verbs/tenses/present", getPresentTenseVerbs);
verbTenseRouter.get("/verbs/tenses/:id", getVerbExercise);

export default verbTenseRouter;
