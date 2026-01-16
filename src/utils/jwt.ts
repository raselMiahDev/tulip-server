import jwt from "jsonwebtoken";

const SECRET = "tulip-secret";

export const signToken = (id: string, role: string) =>
    jwt.sign({ id, role }, SECRET, { expiresIn: "7d" });
