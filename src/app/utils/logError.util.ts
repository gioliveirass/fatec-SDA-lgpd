import { Request } from "express";
import url from "url";

export default function logError(req: Request, err: unknown) {
  const moment = new Date();
  const date = moment.toLocaleDateString("pt-br");
  const hour = moment.toLocaleTimeString("pt-br");

  const urlRoute = url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });

  console.log(`
      ==================================================================
      == ERRO IDENTIFICADO
      ================================================================== \n
      - Data/Hora do erro: ${date} - ${hour} \n
      - Rota: ${urlRoute} \n
      - Descrição do erro:
      ${err}
  `);
}
