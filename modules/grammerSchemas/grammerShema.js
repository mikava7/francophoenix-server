import mongoose from "mongoose";
const grammerSchema = new mongoose.Schema({
  title: {
    titleFr: { type: String, required: true },
    titleEn: { type: String, required: true },
    titleGeo: { type: String },
  },
  description: {
    descriptionFr: [String],
    descriptionEn: [String],
    descriptionGeo: [String],
  },
  example: {
    exampleFr: [String],
    exampleEn: [String],
    exampleGeo: [String],
  },
});
export default mongoose.model("Grammer", grammerSchema);
