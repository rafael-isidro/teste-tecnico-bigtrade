import User from "../models/User";

export class UserService {
  async createUserService(
    displayName: String,
    email: String,
    password: String
  ) {
    const lastUser = await User.findOne({}, {}, { sort: { userId: -1 } });
    const nextUserId = lastUser ? lastUser.userId + 1 : 1;

    const newUser = await User.create({
      userId: nextUserId,
      displayName,
      email: email.toLowerCase().trim(),
      password,
    });

    return newUser;
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
}
