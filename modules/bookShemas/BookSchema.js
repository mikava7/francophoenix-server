import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  definition: String,
  part_of_speech: String,
});
const bookSchema = new mongoose.Schema({
  author: String,
  title: String,
  level: String,
  poster: String,
  description: String,
  verbs: [vocabularySchema],
  chapters: [
    {
      chapterTitle: String,
      subTitle: String,
      text: String,
      chapterImages: Array,
      textVerbs: Array,
      chapterVocabulary: [vocabularySchema],
      verbFormMapping: {
        type: Map,
        of: String,
      },
    },
  ],
});

export default mongoose.model("Book", bookSchema);
