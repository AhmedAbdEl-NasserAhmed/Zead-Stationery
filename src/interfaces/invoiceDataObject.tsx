import { ProductObject } from "./productObject";

export interface InvoiceDataObject {
  id?: string;
  date?: string;
  products?: ProductObject[];
}
