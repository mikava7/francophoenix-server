import express from "express";
import {
  getAllDialogueTopics,
  getDialogueTopicById,
} from "../controllers/dialogueTopicController.js";
const dialogueTopicRouter = express.Router();

dialogueTopicRouter.get("/dialogueTopics", getAllDialogueTopics);
dialogueTopicRouter.get("/dialogueTopics/:id", getDialogueTopicById);
// Add more routes and correspoding controller methods as needed

export default dialogueTopicRouter;
