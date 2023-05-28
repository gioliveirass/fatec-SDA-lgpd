import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Term } from "../entities/term.entity";

export async function createTerm(req: Request, res: Response) {
  const termRepository = AppDataSource.getRepository(Term);

  const { title, description } = req.body;

  try {
    const term = termRepository.create({
      title,
      description,
    });

    await termRepository.save(term);

    return responseWithStatus({ term }, 201);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
