import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";
import { DTOAddress, DTOAddressRegister, DTOAddressReturn, DTOAddressReturnCreate } from "./type";

export async function listAddres(): Promise<DTOAddressReturn> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("address").setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOAddressReturn = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOAddressReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOAddressReturn = {
    status: false,
    code: 401,
    message: "Faça login para acessar esta pagina",
  };
  return res;
}

export async function deleteAddress(id: string): Promise<DTOAddressReturn> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`address/${id}`).setHeaders(authorization).delete();
    const response = await request
      .then((r: any) => {
        const res: DTOAddressReturn = {
          status: true,
          code: r.status,
          message: r.data.message,
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOAddressReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOAddressReturn = {
    status: false,
    code: 401,
    message: "Faça login para acessar esta pagina",
  };
  return res;
}

export async function registerAddress(addres: DTOAddressRegister): Promise<DTOAddressReturnCreate> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl("address")
      .setBody(addres)
      .setHeaders(authorization)
      .post();
    const response = await request
      .then((r: any) => {
        const res: DTOAddressReturnCreate = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOAddressReturnCreate = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOAddressReturnCreate = {
    status: false,
    code: 401,
    message: "Faça login para acessar esta pagina",
  };
  return res;
}

export async function updateAddress(addres: DTOAddress): Promise<DTOAddressReturn> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl("address")
      .setBody(addres)
      .setHeaders(authorization)
      .setBody(addres)
      .put();
    const response = await request
      .then((r: any) => {
        console.log(r);
        const res: DTOAddressReturn = {
          status: true,
          code: r.status,
          message: r.data.message,
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOAddressReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOAddressReturn = {
    status: false,
    code: 401,
    message: "Faça login para acessar esta pagina",
  };
  return res;
}
