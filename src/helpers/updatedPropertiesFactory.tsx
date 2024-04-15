export function updatedPropertiesFactory(
  productsData,
  updatedProperties,
  isAlreadyExisted
) {
  const quantityFlag = !!productsData.quantity;

  const profitPercentaagFlag = !!productsData.profitPercentage;

  if (quantityFlag) {
    return (updatedProperties = {
      piecesCount: isAlreadyExisted.piecesCount - productsData.soldPieces,
      totalPiecesCount:
        productsData.piecesCount +
        (+productsData.quantity % productsData.singleCount),
    });
  }

  if (profitPercentaagFlag) {
    return (updatedProperties = {
      name: productsData["name"],

      piecesCount: +productsData["piecesCount"],

      piecesPrice: +productsData["piecesPrice"],

      singleCount: +productsData["singleCount"],

      singlePrice: +productsData["singlePrice"],

      totalPiecesCount:
        +productsData["piecesCount"] * +productsData["singleCount"],

      pieceProfit:
        +productsData["singlePrice"] * +productsData["singleCount"] -
        +productsData["piecesPrice"],

      singlePieceProfit: Math.ceil(
        (+productsData["singlePrice"] * +productsData["singleCount"] -
          +productsData["piecesPrice"]) /
          +productsData["singleCount"]
      ),

      profitPercentage:
        ((+productsData["singlePrice"] * +productsData["singleCount"] -
          +productsData["piecesPrice"]) *
          +productsData["piecesCount"]) /
        100,
    });
  }

  return updatedProperties;
}
