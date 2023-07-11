import { Schema, model } from "mongoose";

const tweetSchema = new Schema({
  user: { type: String, unique: true, required: true },
  likes: String,
  date: { type: Date, default: Date.now() },
  content: String,
});

export default model("tweet", tweetSchema);

// const tweetSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
