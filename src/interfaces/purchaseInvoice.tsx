import { ProductObject } from "./productObject";

export interface PurchaseInvoice {
  id?: string;
  date?: string;
  sellerName?: string;
  products?: ProductObject[];
}
