import mongoose from "mongoose";
const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verbs: [
    {
      verb: String,
      tenses: [
        {
          tenseName: String,
          percentages: [
            {
              exerciseType: String,
              percentage: Number,
            },
          ],
        },
      ],
      totalPercentage: Number,
    },
  ],

  vocabulary: [
    {
      topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizVocabulary",
        required: true,
      },
      exercises: [
        {
          exerciseType: String,
          percentage: Number,
          completedSentenceIndices: [Number],
          weakWords: [Number],
          topicType: Boolean,
        },
      ],
      totalPercentage: Number,
      completed: { type: Boolean, default: false },
    },
  ],
  downloads: [
    {
      section: String,
      contentId: String,
      downloadDate: Date,
      downloadCount: Number,
    },
  ],
  globalWeakWords: [String],
});
const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
