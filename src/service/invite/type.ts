export type DTOInvite = {
  status: boolean;
  code: number;
  message: string;
  data?: string;
};

export type DTOSimple = {
  name: string;
  image: string;
  id: string;
};

export type DTOBookInvited = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOSimple;
};
