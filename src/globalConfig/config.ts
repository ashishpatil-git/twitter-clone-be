const MONGO_USERNAME = process.env.DB_USERNAME || "superuser";
const MONGO_PASSWORD = process.env.DB_PASSWORD || "secretkey";
const MONGO_DBNAME = process.env.DB_NAME || "";
const MONGO_HOSTNAME = process.env.DB_HOST || "localhost";
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO = {
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DBNAME}?retryWrites=true&w=majority`,
};

const config = {
  mongo: MONGO,
  fileExt: ALLOWED_EXTENSIONS,
};

export default config;
