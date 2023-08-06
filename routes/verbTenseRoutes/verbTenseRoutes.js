import express from "express";
import presentTenseVerb from "../../modules/verbTenseShemas/presentTenseSchema.js";
import { getPresentTenseVerbs } from "../../controllers/verbeTenseContollers/verbTenseControllers.js";
const verbTenseRouter = express.Router();

verbTenseRouter.get("/verbs/tenses/present", getPresentTenseVerbs);

export default verbTenseRouter;
