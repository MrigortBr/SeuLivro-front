import { SimpleStore } from "../store/type";

export type DTOBooksResponse = {
  id: string;
  title: string;
  publicationYear: number;
  genre: string;
  description: string;
  price: number;
  stockQuantity: number;
  enabled: boolean;
  storeUUID: string;
  storeName: string;
  author: string;
  authorId: string;
  image: string;
  linkAuthor?: string;
};

export type DTOBooksSimpleBuy = {
  id: string;
  title: string;
  image: string;
  price: number;
  stockQuantity: number;
  author: string;
};

export type DTOBooksSimple = {
  id: string;
  title: string;
  image: string;
};

export type DTOBooksMounted = {
  title: string;
  publicationYear: number;
  genre: string;
  description: string;
  price: number;
  stockQuantity: number;
  enabled: boolean;
  storeUUID: string;
  storeName: string;
  author: string;
  authorId: string;
  image: string;
};

export type DTOBookReturnAll = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOBooksResponse[];
};

export type DTOBookReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOBooksResponse;
};
