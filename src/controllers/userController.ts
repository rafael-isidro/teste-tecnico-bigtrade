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

      const userUpdated = await userService.updateUserService(
        displayName,
        email,
        password,
        Number(id)
      );

      if (!userUpdated) {
        return res.status(400).json({ message: "User not found" });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
  async getUserController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userService = new UserService();

      const user = await userService.getUserService(Number(id));

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
