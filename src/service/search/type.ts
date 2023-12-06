export type DTOSearchBook = {
  title: string;
  price: number;
  id: string;
  image: string;
  nameAuthor: string;
  nameStore: string;
};

export type DTOSearchAuthor = {
  id: string;
  image: string;
  nameAuthor: string;
  nickname: string;
};

export type DTOSearchGenre = {
  title: string;
  price: number;
  id: string;
  image: string;
  nameAuthor: string;
  nameStore: string;
};

export type DTOSearchBookReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOSearchBook[];
};

export type DTOSearchAuthorReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOSearchAuthor[];
};

export type DTOSearchGenreReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOSearchGenre[];
};
