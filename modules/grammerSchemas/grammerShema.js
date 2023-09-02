import mongoose from "mongoose";
const grammerSchema = new mongoose.Schema({
  grammarAspect: String,
  verbKey: [String],

  title: {
    titleFr: { type: String, required: true },
    titleEng: { type: String, required: true },
    titleGeo: { type: String },
  },
  description: {
    descriptionFr: [String],
    descriptionEng: [String],
    descriptionGeo: [String],
  },
  example: {
    exampleFr: [String],
    exampleEng: [String],
    exampleGeo: [String],
  },
});
export default mongoose.model("Grammer", grammerSchema);
