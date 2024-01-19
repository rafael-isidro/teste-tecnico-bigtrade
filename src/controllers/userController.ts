import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  async createUserController(req: Request, res: Response) {
    try {
      const { displayName, email, password } = req.body;
      const userService = new UserService();

      const newUser = await userService.createUserService(
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

      const updatedUser = await userService.updateUserService(
        displayName,
        email,
        password,
        Number(id)
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User Not Found." })
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

      if (!user) {
        return res.status(404).json({ message: "User not Found." });
      }

      const userFound = {
        userId: user.userId,
        displayName: user.displayName,
        email: user.email,
        password: user.password,
      };

      return res.status(200).json(userFound);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async deleteUserController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userService = new UserService();

      const user = await userService.deleteUserService(Number(id));

      if (user) {
        return res.status(404).json({ message: "Post Not Found." })
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
