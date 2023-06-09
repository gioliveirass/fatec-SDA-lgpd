import { Request } from "express";
import url from "url";

interface CreatedLogPermissionAcceptance {
  date: Date;
  accept: boolean;
  permissionId: string;
  termId: string;
  termVersion: string;
  userId: string;
}

interface CreatedLogUserUpdate {
  date: Date;
  attribute: string;
  userId: string;
}

export function logSucess_userUpdate(
  req: Request,
  logUserUpdate: CreatedLogUserUpdate
) {
  const moment = logUserUpdate.date;
  const date = moment.toLocaleDateString("pt-br");
  const hour = moment.toLocaleTimeString("pt-br");

  const urlRoute = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });

  console.log(`
      ==================================================================
      == USUÁRIO ATUALIZADO
      ================================================================== \n
      - Data/Hora da ação: ${date} - ${hour} \n
      - Rota: ${urlRoute} \n
      - Descrição da ação:
      # Informação modificada: ${logUserUpdate.attribute}
      # Usuário relacionado: ${logUserUpdate.userId}
    `);
}

export function logSucess_permissionAcceptance(
  req: Request,
  logPermissionAcceptance: CreatedLogPermissionAcceptance
) {
  const moment = logPermissionAcceptance.date;
  const date = moment.toLocaleDateString("pt-br");
  const hour = moment.toLocaleTimeString("pt-br");

  const urlRoute = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });

  console.log(`
        ==================================================================
        == ${
          logPermissionAcceptance.accept ? "ACEITAÇÃO" : "RECUSA"
        } DE PERMISSÃO
        ================================================================== \n
        - Data/Hora da ação: ${date} - ${hour} \n
        - Rota: ${urlRoute} \n
        - Descrição da ação:
        # Permissão: ${logPermissionAcceptance.permissionId}
        # Termo: ${logPermissionAcceptance.termId}
        # Versão do termo: ${logPermissionAcceptance.termVersion}
        # Usuário vinculado a ação: ${logPermissionAcceptance.userId}
      `);
}
