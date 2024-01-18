import { Router } from "express";
import { Request, Response } from "express";


const routes = Router();

routes.get("/user", (req: Request, res: Response) => {
    return res.status(200).json({ message: "/user route" });
});

export default routes;