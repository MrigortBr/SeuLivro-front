import { DTOProfile, DTOProfileReturn } from "./type";
import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";

export async function getUser(): Promise<DTOProfileReturn> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("user").setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOProfileReturn = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOProfileReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOProfileReturn = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function updateUser(user: DTOProfile) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("user").setHeaders(authorization).setBody(user).put();
    const response = await request
      .then((r: any) => {
        const res: DTOProfileReturn = {
          status: true,
          code: r.status,
          message: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOProfileReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOProfileReturn = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}
