import { Request, Response } from "express";
import { login } from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response) {
    const response = await login(req, res);
    return res.status(response.status).json(response.message);
  }
}

export default new AuthController();
