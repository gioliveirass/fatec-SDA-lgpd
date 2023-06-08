import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Term } from "../entities/term.entity";

export async function createTerm(req: Request, res: Response) {
  const termRepository = AppDataSource.getRepository(Term);

  const { title, description, version, permissionsIncluded } = req.body;

  try {
    const term = termRepository.create({
      title,
      description,
      version,
      permissionsIncluded,
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

export async function findTerm(req: Request, res: Response) {
  const termRepository = AppDataSource.getRepository(Term);

  const { id } = req.params;

  try {
    const term = await termRepository.findOne({
      where: { id },
      relations: {
        permissionsIncluded: true,
      },
    });

    if (!term) return responseWithStatus("Termo não encontrado", 404);

    return responseWithStatus({ term }, 201);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}

export async function listTerms(req: Request, res: Response) {
  const termRepository = AppDataSource.getRepository(Term);

  try {
    const terms = await termRepository.find({
      relations: {
        permissionsIncluded: true,
      },
    });

    if (!terms) return responseWithStatus("Nenhum termo encontrado", 404);

    return responseWithStatus({ terms }, 201);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
