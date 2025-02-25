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

      if (posts.length === 0)
        return res.status(200).json({ message: "No Posts Found." });

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async getPostController(req: Request, res: Response) {
    try {
      const postService = new PostService();
      const { id } = req.params;

      const post = await postService.getPostService(Number(id));

      if (!post) return res.status(404).json({ message: "Post not Fount." });

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async updatePostController(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;
      const { id } = req.params;
      const postService = new PostService();

      const updatedPost = await postService.updatePostService(
        title,
        content,
        userId,
        Number(id)
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post Not Found." });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async deletePostController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const postService = new PostService();

      const deletedPost = await postService.deletePostService(Number(id));

      if (!deletedPost) {
        return res.status(404).json({ message: "Post Not Found." });
      }
      return res.status(200).json(deletedPost);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error." });
    }
  }
}
