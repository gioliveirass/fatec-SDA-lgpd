import { Request, Response } from "express";
import { login } from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    const findResponse = await login(req, res);
    return res.status(findResponse.status).json(findResponse.message);
  }
}

export default new AuthController();
