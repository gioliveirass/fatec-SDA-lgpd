import { Request, Response } from "express";
import { createTerm } from "../services/term.service";

class TermController {
  async createTerm(req: Request, res: Response) {
    const createResponse = await createTerm(req, res);
    return res.status(createResponse.status).json(createResponse.message);
  }
}

export default new TermController();
