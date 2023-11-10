import express from "express";
import { reportError } from "../../controllers/errorReport/errorReportController.js";

const reportRouter = express.Router();

reportRouter.post("/report", reportError);

export default reportRouter;
