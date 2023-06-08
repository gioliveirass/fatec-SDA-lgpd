import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Permission } from "../entities/permission.entity";
import { User } from "../entities/user.entity";
import { LogPermissionAcceptance } from "../entities/logPermissionAcceptance.entity";

export async function findPermission(req: Request, res: Response) {
  const permissionRepository = AppDataSource.getRepository(Permission);

  const { id } = req.params;

  try {
    const permission = await permissionRepository.findOne({
      where: { id },
      relations: { usersWhoAccepted: true },
    });

    if (!permission)
      return responseWithStatus("Permissão não foi encontrado.", 404);

    return responseWithStatus({ permission }, 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}

export async function createPermission(req: Request, res: Response) {
  const permissionRepository = AppDataSource.getRepository(Permission);

  const { title, description, term } = req.body;

  try {
    const permission = permissionRepository.create({
      title,
      description,
      usersWhoAccepted: [],
      term,
    });

    await permissionRepository.save(permission);

    return responseWithStatus({ permission }, 201);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}

export async function acceptPermission(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const permissionRepository = AppDataSource.getRepository(Permission);
  const queryRunner = AppDataSource.createQueryRunner();

  const { userId, permissionId } = req.body;

  try {
    const userExist = await userRepository.findOne({
      where: { id: userId },
      relations: { acceptedPermissions: true },
    });

    if (!userExist)
      return responseWithStatus("Usuário não foi encontrado.", 404);

    const permissionExist = await permissionRepository.findOne({
      where: { id: permissionId },
      relations: { term: true },
    });

    if (!permissionExist)
      return responseWithStatus("Permissão não foi encontrado.", 404);

    const allAcceptedPermissions = userExist.acceptedPermissions;
    allAcceptedPermissions.push(permissionExist);

    await queryRunner.startTransaction();

    await queryRunner.manager.save(User, userExist);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(LogPermissionAcceptance)
      .values({
        user: userExist,
        term: permissionExist.term,
        permission: permissionExist,
        accept: true,
        termVersion: permissionExist.term.version,
      })
      .execute();

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return responseWithStatus(
      `Permissão ${permissionExist.id} aceita pelo usuário ${userExist.id} com sucesso.`,
      201
    );
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}

export async function refusePermission(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);
  const permissionRepository = AppDataSource.getRepository(Permission);
  const queryRunner = AppDataSource.createQueryRunner();

  const { userId, permissionId } = req.body;

  try {
    const userExist = await userRepository.findOne({
      where: { id: userId },
      relations: { acceptedPermissions: true },
    });

    if (!userExist)
      return responseWithStatus("Usuário não foi encontrado.", 404);

    const permissionExist = await permissionRepository.findOne({
      where: { id: permissionId },
      relations: { term: true },
    });

    if (!permissionExist)
      return responseWithStatus("Permissão não foi encontrado.", 404);

    const allAcceptedPermissions = userExist.acceptedPermissions.filter(
      (acceptedPermission) => {
        return acceptedPermission.id !== permissionExist.id;
      }
    );

    userExist.acceptedPermissions = allAcceptedPermissions;

    await queryRunner.startTransaction();

    await queryRunner.manager.save(User, userExist);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(LogPermissionAcceptance)
      .values({
        user: userExist,
        term: permissionExist.term,
        permission: permissionExist,
        accept: false,
        termVersion: permissionExist.term.version,
      })
      .execute();

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return responseWithStatus(
      `Permissão ${permissionExist.id} recusada pelo usuário ${userExist.id} com sucesso.`,
      201
    );
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
