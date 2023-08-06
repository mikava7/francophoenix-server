import mongoose from "mongoose";

const presentTenseSchema = new mongoose.Schema({
  sentence: String,
  words: [String],
  correctAnswer: String,
});

export default mongoose.model("presentTenseVerb", presentTenseSchema);
