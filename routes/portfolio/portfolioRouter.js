import express from "express";
import {
  getLeaderBoard,
  inputRecord,
} from "../../controllers/portfolio/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/api/portfolio/leader-board", getLeaderBoard);
portfolioRouter.post("/api/portfolio/leader-board/new-entry", inputRecord);

export default portfolioRouter;
