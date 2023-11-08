export interface Order {
  id: number;
  codeNumber: string;
  createdAt: Date;
  description: string;
  clientId: number;
  subTotal: number;
  discRate: number;
  status: number;
  tip: number;
  tax: number;
  branchCode: string;
  employeeEmail: string;
  employeeName: string;
  isDeleted: boolean;
  tableItemId: number;
  tableItemName: string;
  tableSectionId: number;
  tableSectionName: string;
  paymentMethod: number;
  orderDetail: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productName: string;
  productCode: string;
  qty: number;
  price: number;
  description: string;
}
