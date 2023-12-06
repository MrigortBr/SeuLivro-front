export type DTOhistory = {
  image: string;
  datePurchase: Date;
  price: number;
  quantity: number;
  title: string;
  nameStore: string;
  idStore: string;
  idBook: string;
  visible: boolean;
};

export type DTOSales = {
  idBook: string;
  title: string;
  datePurchase: Date;
  image: string;
  quantity: number;
  price: number;
};

export type DTOSalesResponse = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOSales[];
};

export type DTOHistoryResponse = {
  status: boolean;
  code: number;
  message: string;
  data?: DTOhistory[];
};
