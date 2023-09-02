import {
  getAllbooks,
  getBookByLevel,
  getSelectedBook,
} from "../../controllers/bookController/bookController.js";
import express from "express";

const bookrouter = express.Router();

bookrouter.get("/books", getAllbooks);
bookrouter.get("/books-by-level/:level", getBookByLevel);
bookrouter.get("/books/:id", getSelectedBook);

export default bookrouter;
