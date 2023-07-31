import mongoose from "mongoose";

const dialogueTopicSchema = new mongoose.Schema({
  chapter: Number,
  chapterName: {
    chapterNameFr: String,
    chapterNameEng: String,
    chapterNameGeo: String,
  },

  dialogues: [
    {
      dialogueName: String,
      dialogueImg: String,
      dialogue: [
        {
          speaker: String,
          messageFr: String,
          messageEng: String,
          messageGeo: String,
        },
      ],
    },
  ],
  vocabulary: {
    fr: [String],
    en: [String],
    geo: [String],
  },
  verbs: [String],
  phrases: {
    fr: [String],
    en: [String],
    geo: [String],
  },
  exercise: {
    exerciseName: String,
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],
  },
  actions: [{ action: "String", examples: [String] }],
});

export default mongoose.model("dialogueTopic", dialogueTopicSchema);
