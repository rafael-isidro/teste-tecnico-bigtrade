import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { CreateUserParams } from "../services/protocols";

export class VerifyUserFields {
  async verifyRequiredFields(req: Request, res: Response, next: NextFunction) {
    const requiredFields = ["displayName", "email", "password"];

    if (!req.body) {
      return res.status(400).json({ message: "Missing Fields." });
    }

    for (const field of requiredFields) {
      if (!req.body?.[field as keyof CreateUserParams]?.length) {
        return res.status(400).json({ message: `Missing Field: ${field}.` });
      }
    }

    next();
  }

  async verifyEmailExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const existUserEmail = await User.findOne({ email });

    if (existUserEmail) {
      return res.status(400).json({ message: "Invalid Email." });
    }

    next();
  };
}
