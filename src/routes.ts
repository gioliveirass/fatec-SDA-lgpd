import express, { Request, Response, Router } from "express";

import basicMiddleware from "./middlewares/basic.middleware";

import authController from "./app/controllers/auth.controller";
import userController from "./app/controllers/user.controller";
import termController from "./app/controllers/term.controller";
import permissionController from "./app/controllers/permission.controller";

class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "LGPD Project's API 🔒 " });
  }
}

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", Welcome.getWelcome);

router.post("/auth", authController.login);

router.get("/users/:id", basicMiddleware, userController.findUser);
router.post("/users", userController.createUser);
router.put("/users", basicMiddleware, userController.updateUser);

router.post("/terms", basicMiddleware, termController.createTerm);
router.get("/terms/:id", basicMiddleware, termController.findTerm);
router.get("/terms", basicMiddleware, termController.listTerms);

router.get(
  "/permission/:id",
  basicMiddleware,
  permissionController.findPermission
);

router.post(
  "/permission",
  basicMiddleware,
  permissionController.createPermission
);

router.put(
  "/permission/accept",
  basicMiddleware,
  permissionController.acceptPermission
);

router.put(
  "/permission/refuse",
  basicMiddleware,
  permissionController.refusePermission
);

export default router;
