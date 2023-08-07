import mongoose from "mongoose";
const dictionarySchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  part_of_speech: String,
  definition: String,
  synonym: String,
  antonym: String,
});

export default mongoose.model("Dictionary", dictionarySchema);
