import { DTORegister, DTORegisterReturn } from "./type";
import ApiClient from "../axios/Index";

export async function register(userRegister: DTORegister): Promise<DTORegisterReturn> {
  const request = new ApiClient().addUrl("user/register").setBody(userRegister).post();
  const response = await request
    .then((r) => {
      const res: DTORegisterReturn = {
        status: true,
        code: r.status,
        message: r.data.message,
      };
      return res;
    })
    .catch((error) => {
      console.log(error);
      const res: DTORegisterReturn = {
        status: false,
        code: error.response.status,
        message: error.response.data.message,
      };
      return res;
    });

  return response;
}

export function userRegisterIsValid(userRegister: DTORegister): string | boolean {
  const camposVazios: string[] = [];

  if (userRegister.birthDate === "") {
    camposVazios.push("Data de nascimeto");
  }

  if (userRegister.firstName === "") {
    camposVazios.push("Primeiro nome");
  }

  if (userRegister.lastName === "") {
    camposVazios.push("Segundo nome");
  }

  if (userRegister.email === "") {
    camposVazios.push("email");
  }

  if (userRegister.identifier === "") {
    camposVazios.push("CPF/CNPJ");
  }

  if (userRegister.password === "") {
    camposVazios.push("senha");
  }

  if (userRegister.nickname === "") {
    camposVazios.push("apelido");
  }

  // Verifica se há campos vazios
  if (camposVazios.length > 0) {
    if (camposVazios.length === 1) {
      return `${camposVazios[0]} está vazio.`;
    }
    return `${camposVazios.join(" e ")} estão vazios.`;
  }

  return true;
}
