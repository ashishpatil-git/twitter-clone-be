import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jsonwebtoken.verify(
      req.headers.authorization!,
      process.env.secretKey!
    );
    if (token) {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication Failed!!");
  }
};
export default authenticate;
