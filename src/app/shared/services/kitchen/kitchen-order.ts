export interface KitchenOrder {
  id: number;
  orderId: number;
  createdAt: Date;
  description: string;
  version: number;
  branchCode: string;
  details: [
    {
      id: number;
      productCode: string;
      productName: string;
      qty: number;
      description: string;
      isRemove: true;
      kitchenId: number;
    }
  ];
}
