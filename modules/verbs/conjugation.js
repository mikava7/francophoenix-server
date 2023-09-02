import mongoose from "mongoose";

const tenseSchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
});

const conjugationSchema = new mongoose.Schema({
  verb: String,
  verbGeo: String,
  verbEng: String,

  verbGroup: Number,
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
