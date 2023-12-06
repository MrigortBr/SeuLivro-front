import ApiClient from "../axios/Index";
import { DTOBookResponse } from "./type";

export default async function getHome(): Promise<DTOBookResponse> {
  const request = new ApiClient().addUrl("home").get();

  const response = await request
    .then((r) => {
      const res: DTOBookResponse = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      return res;
    })
    .catch((error) => {
      const res: DTOBookResponse = {
        status: false,
        code: error.response.status,
        message: error.response.data.message,
      };
      return res;
    });

  return response;
}
