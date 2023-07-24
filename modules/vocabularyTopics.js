import mongoose from "mongoose";

const vocabularyTopicsSchema = new mongoose.Schema({
  name: String,
  french: Array,
  english: Array,
  georgian: Array,
});

export default mongoose.model("vocabularyTopics", vocabularyTopicsSchema);
