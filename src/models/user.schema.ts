import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, default: "", required: true, unique: true },
  username: { type: String, default: "", required: true, unique: true },
  password: { type: String, default: "", required: true },
  email: { type: String, default: "", required: true, unique: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  photo: { type: String, default: "" },
  banner: { type: String, default: "" },
  followers: { type: Array },
  following: { type: Array },
});

userSchema.index({ name: 1, email: 1, id: 1 }, { unique: true });

export default model("user", userSchema);
