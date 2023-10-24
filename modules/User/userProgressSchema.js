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
          percentage: Number,
          exerciseType: String,
        },
      ],
      totalPercentage: Number,
    },
  ],
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
