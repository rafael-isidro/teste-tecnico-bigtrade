import { Router } from "express";
import { UserController } from "./controllers/userController";
import { PostController } from "./controllers/postController";
import { VerifyUserFields } from "./middlewares/userMiddleware";
import { VerifyPostFields } from "./middlewares/postMiddleware";

const routes = Router();
const verifyUserFields = new VerifyUserFields();
const verifyPostFields = new VerifyPostFields();
const userController = new UserController();
const postController = new PostController();

//User endpoints
routes.post(
  "/users",
  verifyUserFields.verifyRequiredFields,
  verifyUserFields.verifyEmail,
  userController.createUserController
);
routes.put(
  "/users/:id",
  verifyUserFields.verifyRequiredFields,
  verifyUserFields.verifyEmail,
  verifyUserFields.verifyUserId,
  userController.updateUserController
);
routes.get(
  "/users/:id",
  verifyUserFields.verifyUserId,
  userController.getUserController
);
routes.delete(
  "/users/:id",
  verifyUserFields.verifyUserId,
  userController.deleteUserController
);

// Post endpoints
routes.post(
  "/posts",
  verifyPostFields.verifyPostUserId,
  verifyPostFields.verifyPostRequiredFields,
  postController.createPostController
);
routes.get("/posts", postController.getPostsController);

routes.get(
  "/posts/:id",
  verifyPostFields.verifyPostId,
  postController.getPostController
);
routes.put(
  "/posts/:id",
  verifyPostFields.verifyPostUserId,
  verifyPostFields.verifyPostId,
  verifyPostFields.verifyPostRequiredFields,
  postController.updatePostController
);
routes.delete(
  "/posts/:id",
  verifyPostFields.verifyPostId,
  postController.deletePostController
);

export default routes;
