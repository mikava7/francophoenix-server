import mongoose from "mongoose";
const dictionarySchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
});

export default mongoose.model("Dictionary", dictionarySchema);
