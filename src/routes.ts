import { Router } from "express";
import { UserController } from "./controllers/userController";
import { VerifyUserFields } from "./middlewares/userMiddleware";

const routes = Router();
const verifyUserFields = new VerifyUserFields();
const userController = new UserController();

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
  userController.updateUserController
);

routes.get(
  "/users/:id",
  userController.getUserController
);

routes.delete(
  "/users/:id",
  userController.deleteUserController
);

export default routes;
