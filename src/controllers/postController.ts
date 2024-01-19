import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
  async createPostController(req: Request, res: Response) {
    try {
      const postService = new PostService();
      const { title, content, userId } = req.body;
      const newPost = await postService.createPostService(
        title,
        content,
        Number(userId)
      );

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);

      res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
