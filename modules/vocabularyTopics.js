import mongoose from "mongoose";

const vocabularyTopicsSchema = new mongoose.Schema({
  nameEng: String,
  nameFr: String,
  nameGeo: String,
  imageUrl: String,
  french: Array,
  english: Array,
  georgian: Array,
});

export default mongoose.model("vocabularyTopics", vocabularyTopicsSchema);
