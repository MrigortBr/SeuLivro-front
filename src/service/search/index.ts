import ApiClient from "../axios/Index";
import {
  DTOSearchAuthor,
  DTOSearchAuthorReturn,
  DTOSearchBookReturn,
  DTOSearchGenreReturn,
} from "./type";

export async function getByTitleBook(title: string) {
  const request = new ApiClient().addUrl(`book/search?title=${title}`).get();

  const response = await request
    .then((r) => {
      const res: DTOSearchBookReturn = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      return res;
    })
    .catch((error) => {
      const res: DTOSearchBookReturn = {
        status: false,
        code: 400,
        message: "",
      };
      return res;
    });

  return response;
}

export async function getByNickName(title: string) {
  const request = new ApiClient().addUrl(`user/search?nickname=${title}`).get();

  const response = await request
    .then((r) => {
      const res: DTOSearchAuthorReturn = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      return res;
    })
    .catch((error) => {
      const res: DTOSearchAuthorReturn = {
        status: false,
        code: 400,
        message: "",
      };
      return res;
    });

  return response;
}

export async function getByGenre(title: string) {
  const request = new ApiClient().addUrl(`book/search/genre?title=${title}`).get();

  const response = await request
    .then((r) => {
      const res: DTOSearchGenreReturn = {
        status: true,
        code: r.status,
        message: "",
        data: r.data,
      };
      return res;
    })
    .catch((error) => {
      const res: DTOSearchGenreReturn = {
        status: false,
        code: 400,
        message: "",
      };
      return res;
    });

  return response;
}
