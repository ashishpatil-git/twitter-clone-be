import multer from "multer";
import config from "../globalConfig/config";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },

  filename(req: any, file: any, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (config.fileExt.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported File"), false);
  }
};

export const fileUploads = multer({ storage, fileFilter });
