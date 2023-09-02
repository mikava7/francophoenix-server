import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  frenchExamp: String,
  englishExamp: String,
  georgianExamp: String,
});

const descriptionSchema = new mongoose.Schema({
  french: String,
  english: String,
  georgian: String,
  examples: [exampleSchema],
});

const tensesSchema = new mongoose.Schema({
  name: String, // Add this field
});

const Tense = mongoose.model("Tense", tensesSchema);

export default Tense;
