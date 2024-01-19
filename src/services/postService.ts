import Post, { IPost } from "../models/Post";
import User from "../models/User";

export class PostService {
  async createPostService(
    title: string,
    content: string,
    userId: number
  ): Promise<IPost> {
    const published = new Date().toISOString();

    const lastPost = await Post.findOne({}, {}, { sort: { postId: -1 } });

    let nextPostId = getNextPostId();
    if (isNaN(nextPostId)) nextPostId = 1;

    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error(`User with userId ${userId} not found.`);
    }

    const newPost = await Post.create({
      postId: Number(nextPostId),
      title,
      content,
      user_Id: userId,
      published,
    });

    return newPost;

    function getNextPostId() {
      return lastPost ? Number(lastPost.postId) + 1 : 1;
    }
  }

  async getPostsService(): Promise<IPost[]> {
    const posts = await Post.find({}, {__v: 0});
    
    return posts;
  }

  async getPostService(id: number): Promise<IPost | null> {
    const post = await Post.findOne({ postId: Number(id) });

    return post;
  }
}
