import { ProductObject } from "../interfaces/productObject";

export interface UpdateProductProps {
  data: {
    piecesCount: string;
    piecesPrice: string;
    singleCount: string;
    singlePrice: string;
    pieceProfit: number;
    singlePieceProfit: number;
    profitPercentage: number;
    totalPiecesCount: number;
  };
  product: ProductObject;
}
