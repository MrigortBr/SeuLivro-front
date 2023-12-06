import { AxiosResponse } from "axios";
import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";
import { DTOUser, DTOUserResponse, DTOUserResponseList } from "./types";

export async function getUser(localJWT: string) {
  const authorization: Authorization = { Authorization: localJWT };
  const request = await new ApiClient()
    .addUrl("user")
    .setHeaders(authorization)
    .get()
    .then((r) => {
      const dtoUser: DTOUser = {
        id: r.data.id,
        firstName: r.data.firstName,
        lastName: r.data.lastName,
        birthDate: r.data.birthDate,
        email: r.data.email,
        role: r.data.role,
        enalbed: r.data.enalbed,
        nickname: r.data.nickname,
        identifier: r.data.identifier,
        typeIdentifier: r.data.typeIdentifier,
      };

      const response: DTOUserResponse = {
        status: true,
        code: r.status,
        message: "",
        data: dtoUser,
      };

      return response;
    })
    .catch((error) => {
      const res: DTOUserResponse = {
        status: false,
        code: error.response.status,
        message: error.response.data.message,
      };
      return res;
    });

  return request;
}
export async function getUserByUuid(uuid: string) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`user/${uuid}`).setHeaders(authorization).get();
    const response = await request
      .then((r) => {
        const res: DTOUserResponseList = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error) => {
        const res: DTOUserResponseList = {
          status: false,
          code: 400,
          message: "",
        };
        return res;
      });

    return response;
  }
  const res: DTOUserResponseList = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}
export async function validateSession() {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const response = await getUser(localJWT);
    return response;
  }
  const res: DTOUserResponse = {
    status: false,
    code: 0,
    message: "Chave de validação não existe",
  };
  return res;
}
