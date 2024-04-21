import { ProductObject } from "../interfaces/productObject";

interface Props {
  goods: ProductObject[];
}

export function calculatingTotalGoods({ goods }: Props) {
  const totalProfit = goods?.reduce((acc, profit) => {
    return acc + profit.piecesCount * profit.piecesPrice;
  }, 0);

  return totalProfit;
}
