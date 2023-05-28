import express, { Request, Response, Router } from "express";
import userController from "./app/controllers/user.controller";

class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "LGPD Project's API 🔒 " });
  }
}

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", Welcome.getWelcome);

router.post("/users", userController.createUser);

export default router;
