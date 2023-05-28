import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Term } from "../entities/term.entity";
import { User } from "../entities/user.entity";
import { LogTermAcceptance } from "../entities/logTermAcceptance.entity";

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

export async function acceptTerms(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const queryRunner = AppDataSource.createQueryRunner();

  const id = req.body.userId;
  const terms = req.body.terms;

  try {
    const userExist = await userRepository.findOne({
      where: { id },
    });

    if (!userExist)
      return responseWithStatus("Usuário não foi encontrado.", 404);

    await queryRunner.startTransaction();

    userExist.acceptedTerms = terms;
    await queryRunner.manager.save(User, userExist);

    const logTermAcceptance = terms.reduce((prev: any, term: any) => {
      return [...prev, { user: userExist, term: term, accept: true }];
    }, []);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(LogTermAcceptance)
      .values(logTermAcceptance)
      .execute();

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return responseWithStatus("Termos atualizados com sucesso.", 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
