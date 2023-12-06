import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";
import { DTOProfileReturn } from "../profile/type";
import { DTOBookInvited, DTOInvite } from "./type";

export async function generateUrl(idBook: string): Promise<DTOInvite> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`book/invite/${idBook}`).setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOInvite = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOInvite = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOInvite = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function getBookInvited(idBook: string) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl(`book/invite/open/${idBook}`)
      .setHeaders(authorization)
      .get();
    const response = await request
      .then((r: any) => {
        const res: DTOBookInvited = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOBookInvited = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOBookInvited = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function acceptBook(idBook: string) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl(`book/invite/accept/${idBook}`)
      .setHeaders(authorization)
      .get();
    const response = await request
      .then((r: any) => {
        const res: DTOBookInvited = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOBookInvited = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOBookInvited = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}
