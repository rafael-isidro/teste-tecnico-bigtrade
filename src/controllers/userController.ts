import { Request, Response } from "express";
import User from "../models/User";
import { UserService } from "../services/userService";

export class UserController {
  async createUserController(req: Request, res: Response) {
    const { displayName, email, password } = req.body;
    const userService = new UserService();

    const newUser = userService.createUserService(displayName, email, password);

    return res.status(201).json(newUser);
  }
}
