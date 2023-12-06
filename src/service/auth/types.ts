import { DTOSimple } from "../invite/type";

export type DTOUser = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  role: string;
  enalbed: boolean;
  nickname: string;
  identifier: string;
  typeIdentifier: string;
};

export type DTOUserSimple = {
  id: string;
  nickname: string;
  image: string;
};

export type DTOUserlist = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  image: string;
  role: string;
  enalbed: boolean;
  nickname: string;
  identifier: string;
  typeIdentifier: string;
  books: DTOSimple[];
};

export type DTOUserResponse = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOUser;
};

export type DTOUserResponseList = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOUserlist;
};
