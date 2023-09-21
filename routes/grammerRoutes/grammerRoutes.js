import {
  getBasicGrammerLessons,
  getGrammarTopicsByAspect,
  getGrammarAspectList,
  getGrammarLesson,
  getAllSubtitles,
  getAllAspects,
} from "../../controllers/grammerControllers/grammerController.js";
import {
  getAllTenses,
  getTenseList,
  getSelectedTense,
} from "../../controllers/grammerControllers/verbTenseController.js";
import express from "express";

const grammerRouter = express.Router();

grammerRouter.get("/grammer/basic-grammer", getBasicGrammerLessons);
grammerRouter.get("/grammar/subtitles", getAllSubtitles);
grammerRouter.get("/grammar/getAllAspects", getAllAspects);

grammerRouter.get("/grammer/basic-verb-tenses", getAllTenses);
grammerRouter.get("/grammer/basic-verb-tenses/names", getTenseList);
grammerRouter.get("/grammer/basic-verb-tenses/:id", getSelectedTense);
grammerRouter.get("/grammar/all-aspect", getGrammarAspectList);
grammerRouter.get("/grammar/:aspect", getGrammarTopicsByAspect);
// grammerRouter.get("/grammar/:aspect", getGrammarTopicsByAspect);
grammerRouter.get("/grammar/all-aspect/:id", getGrammarLesson);

export default grammerRouter;
