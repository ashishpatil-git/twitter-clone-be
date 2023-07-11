import express, { Request, Response } from "express";
import tweetsSchema from "../models/tweets.schema";
import { generateToken } from "../helpers/jwt.helper";

export const getAllTweets = async (req: Request, res: Response) => {
  const tweets = await tweetsSchema.find({});
  res.send(tweets.reverse());
};

export const createTweet = (req: Request, res: Response) => {};
export const followUnfollow = (req: Request, res: Response) => {};
export const getUserTweets = (req: Request, res: Response) => {};
