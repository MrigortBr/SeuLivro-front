import { DTOBooksResponse } from "../books/type";

export type SimpleStore = {
  name: string;
  uuid: string;
};

export type DTOStore = {
  cnpj: string;
  description: string;
  enabled: boolean;
  fantasyName: string;
  image: string;
  name: string;
};

export type DTOStoreSimple = {
  id: string;
  fantasyName: string;
  image: string;
};

export type DTOStoreProfile = {
  cnpj: string;
  description: string;
  enabled: boolean;
  fantasyName: string;
  image: string;
  name: string;
  books: DTOBooksResponse[];
};

export type DTOStoreReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOStore;
};

export type DTOStoreProfileReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOStoreProfile;
};
