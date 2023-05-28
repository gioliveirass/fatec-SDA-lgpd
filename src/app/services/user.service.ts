import * as bcrypt from "bcrypt";

import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import { LogUserUpdate } from "../entities/logUserUpdate.entity";

export async function createUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, cellphone, password, acceptedTerms } = req.body;

  try {
    const userExists = await userRepository.findOne({ where: { email } });
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    if (userExists) return responseWithStatus({ userExists }, 200);

    const user = userRepository.create({
      name,
      email,
      cellphone,
      passwordHash,
      acceptedTerms,
    });

    await userRepository.save(user);

    return responseWithStatus({ user }, 201);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}

export async function updateUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const queryRunner = AppDataSource.createQueryRunner();

  const { id, name, email, cellphone } = req.body;

  try {
    const userExist = await userRepository.findOne({
      where: { id },
    });

    if (!userExist)
      return responseWithStatus("Usuário não foi encontrado.", 404);

    await queryRunner.startTransaction();

    const userUpdated = await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ name, email, cellphone })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(LogUserUpdate)
      .values([
        {
          attribute: "name",
          newValue: name,
          oldValue: userExist.name,
          user: userExist,
        },
        {
          attribute: "email",
          newValue: email,
          oldValue: userExist.email,
          user: userExist,
        },
        {
          attribute: "cellphone",
          newValue: cellphone,
          oldValue: userExist.cellphone,
          user: userExist,
        },
      ])
      .execute();

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return responseWithStatus(userUpdated.raw[0], 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
