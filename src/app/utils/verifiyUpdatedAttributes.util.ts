import { User } from "../entities/user.entity";

interface NewAtributtes {
  name: string;
  email: string;
  cellphone: string;
}

export default function verifiyUpdatedAttributes(
  existentUser: User,
  newAtributtes: NewAtributtes
) {
  const updatedAttributes: string[] = [];

  if (existentUser.name !== newAtributtes.name) updatedAttributes.push("name");

  if (existentUser.email !== newAtributtes.email)
    updatedAttributes.push("email");

  if (existentUser.cellphone !== newAtributtes.cellphone)
    updatedAttributes.push("cellphone");

  return updatedAttributes;
}
