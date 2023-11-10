import mongoose from "mongoose";

const errorReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: String, // Change the data type as needed (String, ObjectId, etc.)
  },
  url: {
    type: String,
    required: true,
  },
  contentId: {
    type: String, // Change the data type as needed (String, ObjectId, etc.)
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const ErrorReport = mongoose.model("ErrorReport", errorReportSchema);

export default ErrorReport;
