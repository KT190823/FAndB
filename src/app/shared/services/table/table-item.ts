import { Order } from '../order/order';

export interface Table {
  id: number;
  tableName: string;
  tableSectionId: number;
  order?: Order;
}
