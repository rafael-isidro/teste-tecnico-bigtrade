import { Request, Response, NextFunction } from "express";
import { CreatePostParams } from "../services/protocols";
import User from "../models/User";
import Post from "../models/Post";

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
      return res.status(500).json({ message: "Internal Server Error." });
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
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async verifyPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Missing or Invalid Id." });
      }

      const postFound = Post.findOne({ postId: Number(id) });
      if (!postFound) {
        return res.status(400).json({ message: "Post Not Found." });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
