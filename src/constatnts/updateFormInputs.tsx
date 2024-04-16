import { ProductObject } from "../interfaces/productObject";

export const updateFormInputs = function (
  rowId: string,
  product: ProductObject
) {
  return [
    {
      name: `${rowId}.product-piecesCount`,
      defaultValue: product.piecesCount,
      type: "number",
      disabled: false,
      placeholder: "pieces Count",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 1,
          message: "Pieces Count should be more than 1",
        },
      },
    },
    {
      name: `${rowId}.product-piecesPrice`,
      defaultValue: product.piecesPrice,
      type: "number",
      disabled: false,
      placeholder: "pieces Price",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 1,
          message: "Pieces Price should be more than 1",
        },
      },
    },
    {
      name: `${rowId}.product-singleCount`,
      defaultValue: product.singleCount,
      type: "number",
      disabled: false,
      placeholder: "Single Piece Count",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 6,
          message: "Single Piece Count should be more than 6",
        },
      },
    },
    {
      name: `${rowId}.product-singlePrice`,
      defaultValue: product.singlePrice,
      type: "number",
      disabled: false,
      placeholder: "Single Piece Price",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 1,
          message: "Single Piece Price should be more than 1",
        },
      },
    },
    {
      name: `${rowId}.product-totalSingleProductCount`,
      defaultValue: +product?.["piecesCount"] * +product?.["singleCount"],

      type: "number",
      disabled: true,
    },
    {
      name: `${rowId}.product-pieceProfit`,
      defaultValue:
        +product?.["singlePrice"] * +product?.["singleCount"] -
        +product?.["piecesPrice"],

      type: "number",
      disabled: true,
    },
    {
      name: `${rowId}.product-singlePieceProfit`,
      defaultValue: Number(
        (+product?.["singlePrice"] * +product?.["singleCount"] -
          +product?.["piecesPrice"]) /
          +product?.["singleCount"]
      ).toFixed(2),
      type: "number",
      disabled: true,
    },
    {
      name: `${rowId}.product-profitPercentage`,
      defaultValue:
        ((+product?.["singlePrice"] * +product?.["singleCount"] -
          +product?.["piecesPrice"]) *
          +product?.["piecesCount"]) /
        100,
      type: "number",
      disabled: true,
    },
  ];
};
