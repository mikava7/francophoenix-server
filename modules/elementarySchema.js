import mongoose from "mongoose";

const ElementarySchema = new mongoose.Schema({
  lesson: Number,
  "lesson title": {
    type: String,
    required: true,
  },
  grammer: [
    {
      title: String,
      titleGeo: String,
      verbe: [String],
      verbeGeo: [String],
      examples: [String],
      examplesGeo: [String],
    },
  ],
  dialogue: [
    {
      speaker: String,
      message: String,
      translation: String,
    },
  ],
  dialogueExercise: [
    {
      message: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  sentenceBuilder: {
    sentence: String,
    words: [String],
  },
  phrases: {
    originalPhrases: [String],
    translatedPhrases: [String],
  },
});

export default mongoose.model("Elementary", ElementarySchema);
