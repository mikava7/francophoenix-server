import { getAllbooks } from "../controllers/bookController.js";
import express from "express";

const bookrouter = express.Router();

bookrouter.get("/books", getAllbooks);

export default bookrouter;
