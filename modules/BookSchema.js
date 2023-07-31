import mongoose from "mongoose";
// import DictionarySchema from "./dictionarySchema.js";

const bookSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  level: { type: String },
  poster: { type: String },
  chapters: [
    {
      chapterTitle: String,
      subTitle: String,
      text: String,
      chapterImages: Array,
      // vocabulary: [DictionarySchema], // Using the DictionarySchema as a subdocument for vocabulary
    },
  ],
  // dictionary: [DictionarySchema], // Using the DictionarySchema as a subdocument
});

export default mongoose.model("Book", bookSchema);
