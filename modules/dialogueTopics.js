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
      words: [
        {
          french: String,
          english: String,
          georgian: String,
          definition: String,
        },
      ],
      phrases: [
        {
          frenchPhr: String,
          englishPhr: String,
          georgianPhr: String,
        },
      ],
    },
  ],

  // exercise: {
  //   exerciseName: String,
  //   questions: [
  //     {
  //       question: String,
  //       options: [String],
  //       correctAnswer: String,
  //     },
  //   ],
  // },
});

export default mongoose.model("dialogueTopic", dialogueTopicSchema);
