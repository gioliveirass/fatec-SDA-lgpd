import express, { Request, Response, Router } from "express";

import basicMiddleware from "./middlewares/basic.middleware";

import authController from "./app/controllers/auth.controller";
import userController from "./app/controllers/user.controller";
import termController from "./app/controllers/term.controller";

class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "LGPD Project's API 🔒 " });
  }
}

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", Welcome.getWelcome);

router.post("/auth", authController.login);

router.post("/users", userController.createUser);
router.put("/users", basicMiddleware, userController.updateUser);

router.post("/terms", basicMiddleware, termController.createTerm);
router.post("/terms/accept", basicMiddleware, termController.acceptTerms);

export default router;
