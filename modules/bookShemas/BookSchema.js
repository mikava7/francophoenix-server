import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  definition: String,
});
const bookSchema = new mongoose.Schema({
  author: String,
  title: String,
  level: String,
  poster: String,
  description: String,

  vocabulary: [vocabularySchema],
  chapters: [
    {
      chapterTitle: String,
      subTitle: String,
      text: String,
      chapterImages: Array,
    },
  ],
});

export default mongoose.model("Book", bookSchema);
