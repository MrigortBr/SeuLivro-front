import validator from "validator";
import { DTOLogin, DTOLoginReturn } from "./type";
import ApiClient from "../axios/Index";

export default async function login(userLogin: DTOLogin): Promise<DTOLoginReturn> {
  const request = new ApiClient().addUrl("user/login").setBody(userLogin).post();

  const response = await request
    .then((r) => {
      const res: DTOLoginReturn = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      console.log(r.data);
      localStorage.setItem("JWTKey", r.data);

      return res;
    })
    .catch((error) => {
      const res: DTOLoginReturn = {
        status: false,
        code: error.response.status,
        message: error.response.data.message,
      };
      return res;
    });

  return response;
}

export function validateParamsLogin(userLogin: DTOLogin): boolean | string {
  let response = "";

  const { email, password } = userLogin;

  if (!validator.isEmail(email)) {
    response += "Email";
  }

  if (validator.isEmpty(password)) {
    if (response !== "") {
      response += " e Senha";
    } else {
      response += "Senha ";
    }
  }

  if (response === "") {
    return true;
  }

  if (response.length > 6) {
    response = `Os campos ${response} estão vazios ou invalidos.`;
  } else {
    response = `O campo ${response} esta vazio ou invalido.`;
  }
  return response;
}
