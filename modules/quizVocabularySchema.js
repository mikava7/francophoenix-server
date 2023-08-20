import mongoose from "mongoose";

const quizVocabularySchema = new mongoose.Schema({
  topic: String,
  words: Array,
  imageUrl: String,
  text: String,
  exercises: Array,
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);
