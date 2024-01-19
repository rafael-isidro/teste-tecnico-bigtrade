import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  async createUserController(req: Request, res: Response) {
    try {
      const { displayName, email, password } = req.body;
      const userService = new UserService();
      const newUser = userService.createUserService(
        displayName,
        email,
        password
      );

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
  async updateUserController(req: Request, res: Response) {
    try {
      const { displayName, email, password } = req.body;
      const { id } = req.params;
      const userService = new UserService();
      
      await userService.updateUserService(displayName, email, password, Number(id));

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
