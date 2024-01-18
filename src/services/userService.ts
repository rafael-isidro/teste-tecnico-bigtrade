import { Request, Response } from "express";
import User from "../models/User";

export class UserService {
  async createUserService (displayName: String, email: String, password: String) {
    try {
      const newUser = await User.create({
        displayName,
        email,
        password,
      });

      return newUser;
    } catch (error) {}
  }
}
