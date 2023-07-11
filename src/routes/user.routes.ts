import express, { Router } from "express";
import authenticate from "../middlewares/auth.middleware";
import { fileUploads } from "../middlewares/file-upload.middleware";
import {
  getUser,
  login,
  logintoken,
  register,
  updateUser,
  uploadImages,
} from "../controllers/user.controller";
import {
  createTweet,
  followUnfollow,
  getAllTweets,
  getUserTweets,
} from "../controllers/tweet.controller";

const router: Router = express.Router();
//test route
router.get("/", (req, res) => res.send("just dev."));

//user routes
router.post("/register", register);
router.post("/login", login);
router.post("/auth", logintoken);
router.post("/update", authenticate, updateUser);
router.post("/upload", authenticate, fileUploads.array("files"), uploadImages);
router.get("/user", getUser);

//tweet routes
router.get("/home", getAllTweets);
router.get("/userTweets", getUserTweets);
router.post("/tweet", authenticate, createTweet);
router.post("/follow", authenticate, followUnfollow);

export default router;
