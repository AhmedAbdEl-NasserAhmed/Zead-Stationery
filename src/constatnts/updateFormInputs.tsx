export const updateFormInputs = function (rowId: string, product) {
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
      name: `${rowId}.product-pieceProfit`,
      defaultValue: product.pieceProfit,
      type: "number",
      disabled: true,
    },
    {
      name: `${rowId}.product-singlePieceProfit`,
      defaultValue: product.singlePieceProfit,
      type: "number",
      disabled: true,
    },
    {
      name: `${rowId}.product-profitPercentage`,
      defaultValue: product.profitPercentage,
      type: "number",
      disabled: true,
    },
  ];
};
