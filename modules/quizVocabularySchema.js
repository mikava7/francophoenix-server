import mongoose from "mongoose";

const quizVocabularySchema = new mongoose.Schema({
  words: Array,
  sentences: Array,
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);

// const vocabularySchema = new mongoose.Schema({
//   word: { type: String, required: true },
//   translation: { type: String, required: true },
//   definition: { type: String, required: true },
// });
