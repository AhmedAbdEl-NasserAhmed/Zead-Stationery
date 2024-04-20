interface ProductObject {
  id: string;
  piecesCount: number;
  piecesPrice: number;
  totalPrice: number;
}

export interface InvoiceDataObject {
  id?: string;
  date?: string;
  products?: ProductObject[];
  isRefunded?: boolean;
}
