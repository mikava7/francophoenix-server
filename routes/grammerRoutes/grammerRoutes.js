import {
  getBasicGrammerLessons,
  getGrammarTopicsByAspect,
  getGrammarAspectList,
  getGrammarLesson,
} from "../../controllers/grammerControllers/grammerController.js";
import {
  getAllTenses,
  getTenseList,
  getSelectedTense,
} from "../../controllers/grammerControllers/verbTenseController.js";
import express from "express";

const grammerRouter = express.Router();

grammerRouter.get("/grammer/basic-grammer", getBasicGrammerLessons);
grammerRouter.get("/grammer/basic-verb-tenses", getAllTenses);
grammerRouter.get("/grammer/basic-verb-tenses/names", getTenseList);
grammerRouter.get("/grammer/basic-verb-tenses/:id", getSelectedTense);
grammerRouter.get("/grammar/all-aspect", getGrammarAspectList);
grammerRouter.get("/grammar/:aspect", getGrammarTopicsByAspect);
grammerRouter.get("/grammar/:aspect", getGrammarTopicsByAspect);
grammerRouter.get("/grammar/all-aspect/:id", getGrammarLesson);

export default grammerRouter;
