import { Request, Response } from "express";
import { createUser, updateUser } from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const createResponse = await createUser(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }

  async updateUser(req: Request, res: Response) {
    const createResponse = await updateUser(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }
}

export default new UserController();
