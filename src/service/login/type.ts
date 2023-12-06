export type DTOLogin = {
  email: string;
  password: string;
};

export type DTOLoginReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: string;
};
