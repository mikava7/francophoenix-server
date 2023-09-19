import mongoose from "mongoose";
const verbSchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  part_of_speech: String,
  definition: String,
});
const quizVocabularySchema = new mongoose.Schema({
  topic: String,
  topicEng: String,
  topicGeo: String,
  words: Array,
  imageUrl: String,
  text: String,
  exercises: Array,
  textVerbs: [String], // List of verbs in the text
  verbFormMapping: {
    type: Map,
    of: String,
  },
  verbDetails: [verbSchema],
  verbs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conjugation" }], // References to Conjugation documents
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);
