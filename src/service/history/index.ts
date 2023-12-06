import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";
import { DTOhistory, DTOHistoryResponse, DTOSales, DTOSalesResponse } from "./type";

export async function getHistorys() {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("history").setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOHistoryResponse = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOHistoryResponse = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOHistoryResponse = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function getSales() {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl("history/store").setHeaders(authorization).get();
    const response = await request
      .then((r: any) => {
        const res: DTOSalesResponse = {
          status: true,
          code: r.status,
          message: "",
          data: r.data as DTOSales[],
        };
        return res;
      })
      .catch((error: any) => {
        const res: DTOSalesResponse = {
          status: false,
          code: error.response.status,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOSalesResponse = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}
