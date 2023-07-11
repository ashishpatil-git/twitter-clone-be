import express, { Request, Response } from "express";
import { generateID } from "../helpers/utilites";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { uuid } from "uuidv4";
import userSchema from "../models/user.schema";

import { generateToken } from "../helpers/jwt.helper";

export const register = (req: Request, res: Response) => {
  try {
    const { username, password, email, name } = req.body;
    if (!username || !password || !email || !name)
      return res.status(400).send("Invalid field passed");
    const createUID = generateID();
    const newUser = new userSchema({
      id: createUID,
      name: name,
      username: username,
      password: password,
      email: email,
      date: Date.now(),
      description: "",
      photo: null,
      banner: null,
      followers: [],
      following: [],
    });
    newUser
      .save()
      .then(async () => {
        const token = await generateToken({ createUID, username, password });
        return res.json({
          message: "User registered Sucessfully",
          data: {
            username,
            name,
            id: createUID,
            description: "",
            photo: null,
            banner: null,
            followers: [],
            following: [],
            token,
          },
        });
      })
      .catch((e: unknown) => {
        console.log(e);
        return res.status(500).send("User registration failed");
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong", reason: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("Invalid field passed");

  const user = await userSchema.findOne({ username: username });
  if (!user) return res.status(404).send("User does not exist");
  if (user.password !== password)
    return res.status(401).send("Authentication failed");
  const token = await generateToken({ createUID: user.id, username, password });
  res.send({
    username: user.username,
    name: user.name,
    id: user.id,
    photo: user.photo,
    banner: user.banner,
    description: user.description,
    followers: user.followers,
    following: user.following,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, description, name } = req.body;
  if (!id || description?.length < 3 || name?.length < 3)
    return res.status(500).send("Invalid fields");
  const user = await userSchema.findOne({ id });
  if (!user) return res.status(500).send("User not found");
  user.description = description;
  user.name = name;
  await user.save();
  res.json({
    description,
    name,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id, username } = req.query;
  if (!id && !username) return res.status(406).send("Misuse");
  var searchBy = id ? { id } : { username };

  const user = await userSchema.findOne(searchBy);
  if (!user) return res.status(404).send("User Not found.");

  res.send({
    username: user.username,
    name: user.name,
    photo: user.photo,
    banner: user.banner,
    id: user.id,
    description: user.description,
    followers: user.followers,
    following: user.following,
  });
};

export const logintoken = async (req: Request, res: Response) => {
  //   const { token } = req.body;
  //   const decodedCode = jwt.verify(token, process.env.secretKey);
  //   if (!decodedCode) return res.status(401).send("Unauthorized access");
  //   const user = await userSchema.findOne({ id: decodedCode.id });
  //   if (!user) return res.status(404).send("User not found");
  //   res.send({
  //     username: user.username,
  //     name: user.name,
  //     id: user.id,
  //     photo: user.photo,
  //     banner: user.banner,
  //     description: user.description,
  //     followers: user.followers,
  //     following: user.following,
  //     token: token,
  //   });
};

export const uploadImages = async (req: Request, res: Response) => {
  //   const sendForData = {
  //     banner: null,
  //     photo: null,
  //   };
  //   const files: any = req.files;
  //   const user = await userSchema.findOne({
  //     id: files[0].originalname.split("-")[1],
  //   });
  //   if (!user) return res.status(500).send("err");
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     let data = file.originalname.split("-");
  //     try {
  //       let isHasPhoto = user[data[0]]?.split("/").pop();
  //       if (isHasPhoto) fs.unlinkSync(path.resolve() + `\\images\\${isHasPhoto}`);
  //     } catch (error) {
  //       console.log("Old photo could not be deleted");
  //     }
  //     const imageName = `${uuid()}.webp`;
  //     const sizes = {
  //       width: data[0] == "banner" ? 600 : 300,
  //       height: 300,
  //     };
  //     await sharp(file.buffer).resize(sizes).toFile(`./images/${imageName}`);
  //     const imgPath = `http://localhost:3030/images/${imageName}`;
  //     user[data[0]] = imgPath;
  //     sendForData[data[0]] = imgPath;
  //     if (i == req.files.length - 1) send();
  //   }
  //   function send() {
  //     user.save();
  //     res.send(sendForData);
  //   }
};
