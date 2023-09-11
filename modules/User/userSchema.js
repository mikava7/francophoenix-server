import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["consumer", "subscriber", "admin"],
    default: "consumer",
  },
});
const User = mongoose.model("User", userSchema);
export default User;
