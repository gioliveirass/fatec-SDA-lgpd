import * as bcrypt from "bcrypt";

import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";

export async function createUser(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  const { name, email, cellphone, password, acceptedTerms } = req.body;

  try {
    const userExists = await userRepository.findOne({ where: { email } });
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    if (!userExists) {
      const user = userRepository.create({
        name,
        email,
        cellphone,
        passwordHash,
        acceptedTerms,
      });

      await userRepository.save(user);

      return responseWithStatus({ user }, 201);
    } else {
      return responseWithStatus({ userExists }, 200);
    }
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
