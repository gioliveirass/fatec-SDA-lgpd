import { Request, Response } from "express";
import { createUser, updateUser } from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const response = await createUser(req, res);
    return res.status(response.status).json(response.message);
  }

  async updateUser(req: Request, res: Response) {
    const response = await updateUser(req, res);
    return res.status(response.status).json(response.message);
  }
}

export default new UserController();
