import { Request, Response, NextFunction } from "express";
import { CreateUserParams } from "../services/protocols";
import validator from "validator";
import User from "../models/User";

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

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const { id } = req.params;

    const isValidEmail = validator.isEmail(email.toLowerCase().trim());

    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid Email." });
    }

    const existUserEmail = await User.findOne({ email: email.toLowerCase() });

    if (existUserEmail && !id) {
      return res.status(400).json({ message: "Invalid Email." });
    }

    if (existUserEmail && existUserEmail.email === email && existUserEmail.userId !== Number(id)) {
      return res.status(400).json({ message: "Invalid Email." });
    }

    next();
  }
  async verifyId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing or Invalid Id." });
    }

    next();
  }
}
