import { Request, Response } from "express";
import { createUser } from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const createResponse = await createUser(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }
}

export default new UserController();
