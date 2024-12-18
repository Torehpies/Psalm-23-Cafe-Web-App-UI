import { Supplies } from './supplies.model';

export interface StockHistory {
  ingredient: {
    _id: string;
    details?: Supplies;
  };
  Price: number;
  Quantity: number;
  Date: Date;
  ExpiryDate?: Date;
  EmployeeId?: string;
}
