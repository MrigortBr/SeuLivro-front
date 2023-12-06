import ApiClient from "../axios/Index";
import { Authorization } from "../axios/type";
import { DTOBookReturn, DTOBookReturnAll, DTOBooksResponse } from "./type";

export async function getByUUID(uuid: string) {
  const request = new ApiClient().addUrl(`book/${uuid}`).get();

  const response = await request
    .then((r) => {
      const res: DTOBookReturn = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      return res;
    })
    .catch((error) => {
      const res: DTOBookReturn = {
        status: false,
        code: 400,
        message: "",
      };
      return res;
    });

  return response;
}

export async function getMyBooks() {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`book`).setHeaders(authorization).get();

    const response = await request
      .then((r) => {
        const res: DTOBookReturnAll = {
          status: true,
          code: r.status,
          message: "",
          data: r.data,
        };
        return res;
      })
      .catch((error) => {
        const res: DTOBookReturnAll = {
          status: false,
          code: 400,
          message: "",
        };
        return res;
      });

    return response;
  }
  const res: DTOBookReturnAll = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function updateBook(book: DTOBooksResponse) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient().addUrl(`book`).setHeaders(authorization).setBody(book).put();

    const response = await request
      .then((r) => {
        const res: DTOBookReturnAll = {
          status: true,
          code: r.status,
          message: r.data.message,
          data: r.data,
        };
        return res;
      })
      .catch((error) => {
        const res: DTOBookReturnAll = {
          status: false,
          code: 400,
          message: "",
        };
        return res;
      });

    return response;
  }
  const res: DTOBookReturnAll = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function createBook(book: DTOBooksResponse) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl(`book/register`)
      .setHeaders(authorization)
      .setBody(book)
      .post();

    const response = await request
      .then((r) => {
        const res: DTOBookReturnAll = {
          status: true,
          code: r.status,
          message: r.data.message,
          data: r.data,
        };
        return res;
      })
      .catch((error) => {
        const res: DTOBookReturnAll = {
          status: false,
          code: 400,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOBookReturnAll = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}

export async function buyBook(idBook: string, idAddress: string, quantity: number) {
  const localJWT = localStorage.getItem("JWTKey");
  if (localJWT != null) {
    const authorization: Authorization = { Authorization: localJWT };
    const request = new ApiClient()
      .addUrl(`book/buy`)
      .setHeaders(authorization)
      .setBody({ idBook, idAddress, quantity })
      .put();
    const response = await request
      .then((r) => {
        const res: DTOBookReturnAll = {
          status: true,
          code: r.status,
          message: r.data.message,
        };
        return res;
      })
      .catch((error) => {
        console.log(error);
        const res: DTOBookReturnAll = {
          status: false,
          code: 400,
          message: error.response.data.message,
        };
        return res;
      });

    return response;
  }
  const res: DTOBookReturnAll = {
    status: false,
    code: 404,
    message: "O usuario nao tem login",
  };
  return res;
}
