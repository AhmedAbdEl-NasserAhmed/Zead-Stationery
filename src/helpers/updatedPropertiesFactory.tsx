import { ProductObject } from "../interfaces/productObject";

export function updatedPropertiesFactory(productsData, isAlreadyExisted) {
  let updatedProperties: ProductObject = {};

  const quantityFlag = !!productsData.quantity;

  const piecesPriceFlag = !!productsData.piecesPrice;

  if (quantityFlag) {
    return (updatedProperties = {
      piecesCount: isAlreadyExisted.piecesCount - productsData.soldPieces,

      totalSingleProductCount:
        productsData.piecesCount +
        (+productsData.quantity % productsData.singleCount),
    });
  }

  if (piecesPriceFlag) {
    return (updatedProperties = {
      name: productsData["name"],

      type: productsData["type"]
        ? productsData["type"]
        : isAlreadyExisted["type"],

      piecesCount: +productsData["piecesCount"],

      piecesPrice: +productsData["piecesPrice"],

      singleCount: +productsData["singleCount"],

      singlePrice: +productsData["singlePrice"],

      totalSingleProductCount:
        productsData["piecesCount"] * productsData["singleCount"],
    });
  }

  return updatedProperties;
}
