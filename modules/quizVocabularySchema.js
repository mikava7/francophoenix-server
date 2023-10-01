import mongoose from "mongoose";
const verbSchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  part_of_speech: String,
  definition: String,
});
const categorySchema = new mongoose.Schema({
  categoryFr: String,
  categoryEn: String,
  categoryKa: String,
});
const typeShema = new mongoose.Schema({
  typeFr: String,
  typeEn: String,
  typeKa: String,
});
const quizVocabularySchema = new mongoose.Schema({
  type: [typeShema],
  category: [categorySchema],
  topic: String,
  topicEng: String,
  topicGeo: String,
  words: Array,
  imageUrl: String,
  text: String,
  exercises: Array,
  textVerbs: [String],
  verbFormMapping: {
    type: Map,
    of: String,
  },
  verbDetails: [verbSchema],
  verbs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conjugation" }], // References to Conjugation documents
});

export default mongoose.model("quizVocabulary", quizVocabularySchema);
