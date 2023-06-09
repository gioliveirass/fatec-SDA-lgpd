import * as bcrypt from "bcrypt";

import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import { LogUserUpdate } from "../entities/logUserUpdate.entity";
import verifiyUpdatedAttributes from "../utils/verifiyUpdatedAttributes.util";
import { logSucess_userUpdate } from "../utils/logSuccess.util";

export async function createUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, cellphone, password } = req.body;

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

    const updatedAtributtes = verifiyUpdatedAttributes(userExist, {
      name,
      email,
      cellphone,
    });

    await queryRunner.startTransaction();

    const userUpdated = await queryRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({ name, email, cellphone })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    const logsToCreate = updatedAtributtes.map((attribute) => {
      return {
        attribute,
        user: userExist,
      };
    });

    const createdLogs = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(LogUserUpdate)
      .values(logsToCreate)
      .returning("*")
      .execute();

    createdLogs.raw &&
      createdLogs.raw.forEach((log: any) => {
        logSucess_userUpdate(req, log);
      });

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

export async function findUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const { id } = req.params;

  try {
    const user = await userRepository.findOne({
      where: { id },
      relations: { acceptedPermissions: true },
    });

    if (!user) return responseWithStatus("Usuário não foi encontrado.", 404);

    return responseWithStatus({ user }, 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
