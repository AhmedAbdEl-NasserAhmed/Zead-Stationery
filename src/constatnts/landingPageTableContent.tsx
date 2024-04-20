import { ProductObject } from "../interfaces/productObject";

export function landingPageTableContent(product: ProductObject) {
  return [
    { name: " Product Name", serverKey: "name", value: product?.name },
    {
      name: "Product Type",
      value: product?.type,
      serverKey: "type",
    },
    {
      name: "Pieces Quantity",
      serverKey: "piecesCount",
      value: product?.piecesCount,
    },

    {
      name: " Units In One Piece",
      serverKey: "singleCount",
      value: product?.singleCount,
    },

    {
      name: "Total Product Quantity ",
      serverKey: "totalSingleProductCount",
      value: product?.piecesCount * product?.singleCount,
    },

    {
      name: "Piece Price",
      serverKey: "piecesPrice",
      value: product?.piecesPrice,
    },

    {
      name: "Single Piece Price",
      serverKey: "singlePrice",
      value: product?.singlePrice,
    },
    {
      name: "Profit Of Piece",
      serverkey: null,
      value:
        +product?.["singlePrice"] * +product?.["singleCount"] -
        +product?.["piecesPrice"],
    },
    {
      name: "Profit Of Single Piece",
      serverkey: null,
      value: Math.ceil(
        (+product?.["singlePrice"] * +product?.["singleCount"] -
          +product?.["piecesPrice"]) /
          +product?.["singleCount"]
      ),
    },
    {
      name: "Profit Percentage %",
      serverkey: null,
      value:
        ((+product?.["singlePrice"] * +product?.["singleCount"] -
          +product?.["piecesPrice"]) *
          +product?.["piecesCount"]) /
        100,
    },
  ];
}
