export type DTOAddress = {
  id: string;
  streetAddress: string;
  city: string;
  acronymState: string;
  postalCode: string;
  country: string;
  reference: string;
  name: string;
};

export type DTOAddressRegister = {
  streetAddress: string;
  city: string;
  acronymState: string;
  postalCode: string;
  country: string;
  reference: string;
  name: string;
};

export type DTOAddressReturnCreate = {
  status: boolean;
  code: number;
  message: string;
  data?: string;
};

export type DTOAddressReturn = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOAddress[];
};
