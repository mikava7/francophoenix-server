import mongoose from "mongoose";
// import DictionarySchema from "./dictionarySchema.js";

const bookSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  level: { type: String },
  poster: { type: String, required: true },
  chapters: [
    {
      chapterTitle: { type: String, required: true },
      subTitle: { type: String },
      text: { type: String, required: true },

      // vocabulary: [DictionarySchema], // Using the DictionarySchema as a subdocument for vocabulary
    },
  ],
  // dictionary: [DictionarySchema], // Using the DictionarySchema as a subdocument
});

export default mongoose.model("Book", bookSchema);
