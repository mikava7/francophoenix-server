import mongoose from "mongoose";
const sentenceBuilderSchema = new mongoose.Schema({
  sentence: String,
  words: [String],
});

const Sentence = mongoose.model("SentenceBuilder", sentenceBuilderSchema);
export default Sentence;
