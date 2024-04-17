export interface InvoiceDetails {
  name?: string;
  type?: string;
  countPieces?: string;
  pricePieces?: string;
  piecesCount?: string;
  piecesPrice?: string;
  singleCount?: string;
  singlePrice?: string;
  quantity?: string;
  total?: {
    number1: string;
    number2: string;
  };
}
