import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
// import helmet from "helmet";
// import logger from "morgan";
import config from "./globalConfig/config";
import router from "./routes/user.routes";
const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,PATCH,DELETE",
  credential: "true",
  exposeHeaders: ["x-auth-token"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/images", express.static('images'));
app.use(router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to my server");
});

mongoose
  .connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Database Connected sucessfully");
    app.listen(PORT, () => {
      console.log(`Server Initiated on PORT -> ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error connecting to DB");
  });
