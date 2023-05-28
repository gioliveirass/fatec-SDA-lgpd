import { Request, Response } from "express";
import { createTerm, acceptTerms, refuseTerms } from "../services/term.service";

class TermController {
  async createTerm(req: Request, res: Response) {
    const response = await createTerm(req, res);
    return res.status(response.status).json(response.message);
  }

  async acceptTerms(req: Request, res: Response) {
    const response = await acceptTerms(req, res);
    return res.status(response.status).json(response.message);
  }

  async refuseTerms(req: Request, res: Response) {
    const response = await refuseTerms(req, res);
    return res.status(response.status).json(response.message);
  }
}

export default new TermController();
