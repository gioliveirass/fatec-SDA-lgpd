import { Request, Response } from "express";
import { createTerm, findTerm, listTerms } from "../services/term.service";

class TermController {
  async createTerm(req: Request, res: Response) {
    const response = await createTerm(req, res);
    return res.status(response.status).json(response.message);
  }

  async findTerm(req: Request, res: Response) {
    const response = await findTerm(req, res);
    return res.status(response.status).json(response.message);
  }

  async listTerms(req: Request, res: Response) {
    const response = await listTerms(req, res);
    return res.status(response.status).json(response.message);
  }
}

export default new TermController();
