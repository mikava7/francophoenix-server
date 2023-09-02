import {
  getAllVerbs,
  getVerbDetails,
  getSelectedVerbsDetails,
} from "../../controllers/conjugationControllers/conjugationController.js";
import express from "express";

const conjugationRouter = express.Router();

conjugationRouter.get("/verbs", getAllVerbs);
conjugationRouter.get("/get-verb-details/:verb", getVerbDetails);
conjugationRouter.get("/get-verbs-details/:verbs", getSelectedVerbsDetails);

export default conjugationRouter;
// être;
