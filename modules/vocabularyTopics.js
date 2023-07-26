import mongoose from "mongoose";

const vocabularyTopicsSchema = new mongoose.Schema({
  nameEng: String,
  nameFr: String,
  nameGeo: String,
  imageUrl: String,
  french: Array,
  english: Array,
  georgian: Array,

  frenchExamples: Array,
  englishExamples: Array,
  georgianExamples: Array,

  frenchTematic: Array,
  englishTematic: Array,
  georgianTematic: Array,
});

export default mongoose.model("vocabularyTopics", vocabularyTopicsSchema);
