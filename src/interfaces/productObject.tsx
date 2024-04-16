export interface ProductObject {
  id?: string;
  name?: string;
  type?: string;

  piecesCount?: number;
  piecesPrice?: number;
  pieceProfit?: number;
  singleCount?: number;
  singlePrice?: number;
  singlePieceProfit?: number;
  profitPercentage?: number;
  totalPiecesCount?: number;
  isRefundable?: boolean;
  totalSingleProductCount?: number;
}
