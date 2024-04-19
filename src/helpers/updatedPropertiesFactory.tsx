import { InvoiceType } from "../enums/enums";
import { ProductObject } from "../interfaces/productObject";

export function updatedPropertiesFactory(
  invoiceType,
  productsData,
  isAlreadyExisted
) {
  let updatedProperties: ProductObject = {};

  console.log("invoiceType", invoiceType);

  if (InvoiceType.SELL === invoiceType) {
    return (updatedProperties = {
      piecesCount: isAlreadyExisted.piecesCount - productsData.soldPieces,

      totalSingleProductCount:
        productsData.soldPieces > 0
          ? productsData.piecesCount +
            (+productsData.quantity % productsData.singleCount)
          : isAlreadyExisted.totalSingleProductCount - productsData.quantity,
    });
  }

  if (InvoiceType.REFUND === invoiceType) {
    return (updatedProperties = {
      piecesCount: isAlreadyExisted.piecesCount + productsData.soldPieces,

      totalSingleProductCount:
        isAlreadyExisted.totalSingleProductCount + +productsData.quantity,
    });
  }

  if (InvoiceType.UPDATE === invoiceType) {
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
