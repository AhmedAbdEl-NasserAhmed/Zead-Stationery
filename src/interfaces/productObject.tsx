export interface ProductObject {
  id?: string;
  name?: string;
  type?: string;
  existedProductId?: string;

  quantity?: number;
  piecesCount?: number;
  piecesPrice?: number;
  pieceProfit?: number;
  singleCount?: number;
  singlePrice?: number;
  singlePieceProfit?: number;
  profitPercentage?: number;
  totalPiecesCount?: number;
  isRefundable?: boolean;
  soldPieces?: number;
  totalSingleProductCount?: number;
  totalPrice?: number;
}
