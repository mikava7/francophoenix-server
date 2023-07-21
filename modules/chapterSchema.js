import mongoose from "mongoose";
import Vocabulary from "./vocabularySchema.js";
const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  chapterNumber: { type: Number, required: true },
  vocabulary: [Vocabulary.schema], // Using the Vocabulary schema as a subdocument
  images: [String], // Array of image URLs (optional)
});

export default mongoose.model("Chapter", chapterSchema);
