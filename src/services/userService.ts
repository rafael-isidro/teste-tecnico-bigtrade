import User from "../models/User";
import Post from "../models/Post";

export class UserService {
  async createUserService(
    displayName: String,
    email: String,
    password: String
  ) {

    const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });

    const nextUserId = getNextUserId();

    const newUser = await User.create({
      userId: nextUserId,
      displayName,
      email: email.toLowerCase().trim(),
      password,
    });

    return newUser;

    function getNextUserId() {
      return lastUser ? Number(lastUser.userId) + 1 : 1;
    }
  }

  async updateUserService(
    displayName: String,
    email: String,
    password: String,
    userId: number
  ) {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        displayName,
        email: email.toLowerCase().trim(),
        password,
      }
    );
    if (updatedUser) {
      const { password: _, ...user } = updatedUser;
      return user;
    }
    return null;
  }

  async getUserService(userId: number) {
    const userFound = await User.findOne({ userId });

    return userFound;
  }

  async deleteUserService(userId: number) {
    const userFound = await User.findOneAndDelete({ userId });

    await Post.deleteMany({ userId });

    return userFound;
  }
}
