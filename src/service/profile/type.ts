export type DTOProfile = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  email: string;
  identifier: string;
  typeIdentifier: string;
  enabled: boolean;
  image: string;
  password?: string;
};

export type DTOProfileReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOProfile;
};
