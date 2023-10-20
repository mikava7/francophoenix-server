import mongoose from "mongoose";
import VerbTenseExercise from "../verbTenseShemas/presentTenseSchema.js";
const tenseSchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
});

const conjugationSchema = new mongoose.Schema({
  verb: String,
  verbGeo: String,
  verbEng: String,
  primary: Boolean,
  verbGroup: String,
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VerbTenseExercise",
  },
  forms: {
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

const Conjugation = mongoose.model("Conjugation", conjugationSchema);

export default Conjugation;
