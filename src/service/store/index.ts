import { DTOStore, DTOStoreProfileReturn, DTOStoreReturn } from "./type";
import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";

export async function getMyStore(): Promise<DTOStoreReturn> {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("store").setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOStoreReturn = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOStoreReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOStoreReturn = {
    status: false,
    code: 404,
    message: "Realize o login para entrar na sua conta",
  };
  return res;
}

export async function updateStore(store: DTOStore) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("store").setHeaders(authorization).setBody(store).put();
    const response = await request
      .then((r: any) => {
        const res: DTOStoreReturn = {
          status: true,
          code: r.status,
          message: r.data.message,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOStoreReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOStoreReturn = {
    status: false,
    code: 400,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function getStore(uuid: string) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`store/${uuid}`).setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOStoreProfileReturn = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOStoreProfileReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOStoreProfileReturn = {
    status: false,
    code: 400,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function createStore(store: DTOStore) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("store").setHeaders(authorization).setBody(store).post();
    const response = await request
      .then((r: any) => {
        const res: DTOStoreReturn = {
          status: true,
          code: r.status,
          message: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOStoreReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOStoreReturn = {
    status: false,
    code: 400,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function deleteStore() {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("store").setHeaders(authorization).delete();
    const response = await request
      .then((r: any) => {
        const res: DTOStoreReturn = {
          status: true,
          code: r.status,
          message: r.data.message,
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOStoreReturn = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOStoreReturn = {
    status: false,
    code: 400,
    message: "O usuario nao tem login",
  };
  return res;
}
