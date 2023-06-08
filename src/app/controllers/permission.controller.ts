import { Request, Response } from "express";
import {
  acceptPermission,
  createPermission,
  findPermission,
  refusePermission,
} from "../services/permission.service";

class PermissionController {
  async findPermission(req: Request, res: Response) {
    const response = await findPermission(req, res);
    return res.status(response.status).json(response.message);
  }

  async createPermission(req: Request, res: Response) {
    const response = await createPermission(req, res);
    return res.status(response.status).json(response.message);
  }

  async acceptPermission(req: Request, res: Response) {
    const response = await acceptPermission(req, res);
    return res.status(response.status).json(response.message);
  }

  async refusePermission(req: Request, res: Response) {
    const response = await refusePermission(req, res);
    return res.status(response.status).json(response.message);
  }
}

export default new PermissionController();
