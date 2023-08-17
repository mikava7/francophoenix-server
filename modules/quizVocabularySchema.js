import mongoose from "mongoose";

const quizVocabularySchema = new mongoose.Schema({
  topic: String,
  words: Array,
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);
