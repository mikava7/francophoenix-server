import mongoose from "mongoose";

const tenseSchema = new mongoose.Schema(
  {
    sentence: String,
    words: [String],
    correctAnswer: String,
  },
  { timestamps: true }
);

const verbTenseExerciseSchema = new mongoose.Schema({
  verb: String,
  tenses: {
    present: [tenseSchema],
    passeCompose: [tenseSchema],
    imparfait: [tenseSchema],
    passeSimple: [tenseSchema],
    futurProche: [tenseSchema],
    futurSimple: [tenseSchema],
    conditionnelPresent: [tenseSchema],
    conditionnelPasse: [tenseSchema],
  },
});

export default mongoose.model("VerbTenseExercise", verbTenseExerciseSchema);
