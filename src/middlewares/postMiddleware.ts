import { Request, Response, NextFunction } from "express";
import { CreatePostParams } from "../services/protocols";
import User from "../models/User";

export class VerifyPostFields {
  async verifyPostUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      if (!userId || isNaN(userId)) {
        return res.status(400).json({ message: "Missing or Invalid User Id." });
      }

      const existUser = await User.findOne({ userId: Number(userId) });

      if (!existUser) {
        return res.status(400).json({ message: "Invalid User Id." });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async verifyPostRequiredFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requiredFields = ["title", "content", "userId"];

      if (!req.body) {
        return res.status(400).json({ message: "Missing Fields." });
      }

      for (const field of requiredFields) {
        if (!req.body?.[field as keyof CreatePostParams]) {
          return res.status(400).json({ message: `Missing Field: ${field}.` });
        }
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
