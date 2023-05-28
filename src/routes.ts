import express, { Request, Response, Router } from "express";

class Welcome {
  static getWelcome(req: Request, res: Response) {
    return res.send({ message: "LGPD Project's API 🔒 " });
  }
}

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", Welcome.getWelcome);

export default router;
