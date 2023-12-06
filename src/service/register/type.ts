export type DTORegister = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  password: string;
  email: string;
  identifier: string;
  typeIdentifier: string;
  image: string;
};

export type DTORegisterReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: string;
};
