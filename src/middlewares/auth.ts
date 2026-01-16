import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth =
    (...roles: string[]) =>
        (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ message: "Unauthorized" });

            const decoded = jwt.verify(token, "tulip-secret") as any;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        };
