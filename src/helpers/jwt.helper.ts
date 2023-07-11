import jsonwebtoken from "jsonwebtoken";

interface IPayload {
  createUID: number;
  username: string;
  password: string;
}

export const generateToken = async (payload: IPayload) => {
  const { createUID, username, password } = payload;
  const token = await jsonwebtoken.sign(
    { id: createUID, username: username, password: password },
    process.env.secretKey!,
    { expiresIn: "24h" }
  );
  return token;
};
