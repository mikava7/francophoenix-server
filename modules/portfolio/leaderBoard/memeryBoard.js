import mongoose from "mongoose";

const leaderBoardSchema = new mongoose.Schema(
  {
    name: String,
    time: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("LeaderBoard", leaderBoardSchema);
