import mongoose from "mongoose";

const quizVocabularySchema = new mongoose.Schema({
  topic: String,
  words: Array,
  imageUrl: String,
  text: String,
  exercises: Array,
  textVerbs: [String], // List of verbs in the text
  verbFormMapping: {
    type: Map,
    of: String,
  },
  verbs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conjugation" }], // References to Conjugation documents
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);
