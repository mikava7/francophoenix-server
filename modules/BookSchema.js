import mongoose from "mongoose";
// import DictionarySchema from "./dictionarySchema.js";

const bookSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  chapters: [
    {
      title: { type: String, required: true },
      subTitle: { type: String },
      text: { type: String, required: true },

      // vocabulary: [DictionarySchema], // Using the DictionarySchema as a subdocument for vocabulary
    },
  ],
  // dictionary: [DictionarySchema], // Using the DictionarySchema as a subdocument
});

export default mongoose.model("Book", bookSchema);
