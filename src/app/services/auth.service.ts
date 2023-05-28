import * as bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import logError from "../utils/logError.util";
import responseWithStatus from "../utils/responseWithStatus.util";

import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";

export async function login(req: Request, res: Response) {
  const userRepository = AppDataSource.getRepository(User);

  const { email, password } = req.body;

  try {
    const foundUser = await userRepository.findOne({
      where: { email },
    });

    if (!foundUser) return responseWithStatus("Usuário não encontrado", 401);

    const isMatch = bcrypt.compareSync(password, foundUser.passwordHash);

    if (!isMatch) return responseWithStatus("Senha incorreta", 401);

    const token = jwt.sign(
      { id: foundUser.id, name: foundUser.name },
      process.env.SECRET_JWT,
      { expiresIn: "1d" }
    );

    return responseWithStatus({ foundUser, token }, 200);
  } catch (err) {
    logError(req, err);
    return responseWithStatus(
      "Ocorreu um erro no servidor, tente novamente mais tarde",
      500
    );
  }
}
