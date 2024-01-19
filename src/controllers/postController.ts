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

      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async getPostsController(req: Request, res: Response) {
    try {
      const postService = new PostService();
      const posts = await postService.getPostsService();

      if(posts.length === 0) return res.status(200).json({ message: "No Posts Found." })

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
