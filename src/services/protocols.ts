export interface CreateUserParams {
  displayName: string;
  email: string;
  password: string;
}

export interface CreatePostParams {
  title: string;
  content: string;
  user_Id: number;
}
