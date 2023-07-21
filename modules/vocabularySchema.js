import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  definition: { type: String, required: true },
});

export default mongoose.model("Vocabulary", vocabularySchema);