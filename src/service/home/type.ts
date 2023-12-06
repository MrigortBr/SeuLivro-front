import { DTOUserSimple } from "../auth/types";
import { DTOBooksSimple } from "../books/type";
import { DTOStoreSimple } from "../store/type";

export type allReturns = {
  books: DTOBooksSimple[];
  authors: DTOUserSimple[];
  stores: DTOStoreSimple[];
};

export type DTOBookResponse = {
  status: boolean;
  code: number;
  message: string;
  data?: allReturns;
};
