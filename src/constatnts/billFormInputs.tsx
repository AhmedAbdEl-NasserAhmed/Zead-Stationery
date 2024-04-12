export const billFormInputs = function (
  rowId: string,
  formData: object,
  setSelectedBillProductQuantity: (number: number) => void,
  setCurrentRowId: (rowId: string) => void
) {
  return [
    {
      name: `${rowId}.product-type`,
      type: "text",
      disabled: true,
      placeholder: "Product Type",
    },

    {
      name: `${rowId}.product-billPiecesCount`,
      type: "number",
      defaultValue: 0,
      disabled: true,
      placeholder: "Pieces Count",
    },
    {
      name: `${rowId}.product-billSinglePrice`,
      type: "number",
      disabled: true,
      placeholder: "Single Piece Price",
    },

    {
      name: `${rowId}.product-billQunantity`,
      type: "number",
      disabled: false,
      placeholder: "Quantity",
      onClick() {
        setSelectedBillProductQuantity(
          +formData[rowId]["product-billPiecesCount"] +
            +formData[rowId]["product-billQunantity"]
        );
        setCurrentRowId(rowId);
      },
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
        min: {
          value: 1,
          message: "This field should  be more than 1 ",
        },
        max: {
          value:
            +formData?.[rowId]?.["product-billPiecesCount"] +
            +formData?.[rowId]?.["product-billQunantity"],
          message: "This field should  be less than Pieces Quantity ",
        },
      },
    },
    {
      name: `${rowId}.product-billTotalPrice`,
      type: "number",
      defaultValue: 0,
      disabled: true,
      placeholder: "Total Price",
    },

    // {
    //   name: `${rowId}.product-piecesPrice`,
    //   defaultValue: product.piecesPrice,
    //   type: "number",
    //   disabled: false,
    //   placeholder: "pieces Price",
    //   validationInputs: {
    //     required: {
    //       value: true,
    //       message: "This field is required",
    //     },
    //     min: {
    //       value: 1,
    //       message: "Pieces Price should be more than 1",
    //     },
    //   },
    // },
    // {
    //   name: `${rowId}.product-singleCount`,
    //   defaultValue: product.singleCount,
    //   type: "number",
    //   disabled: false,
    //   placeholder: "Single Piece Count",
    //   validationInputs: {
    //     required: {
    //       value: true,
    //       message: "This field is required",
    //     },
    //     min: {
    //       value: 6,
    //       message: "Single Piece Count should be more than 6",
    //     },
    //   },
    // },

    // {
    //   name: `${rowId}.product-pieceProfit`,
    //   defaultValue: product.pieceProfit,
    //   type: "number",
    //   disabled: true,
    // },
    // {
    //   name: `${rowId}.product-singlePieceProfit`,
    //   defaultValue: product.singlePieceProfit,
    //   type: "number",
    //   disabled: true,
    // },
    // {
    //   name: `${rowId}.product-profitPercentage`,
    //   defaultValue: product.profitPercentage,
    //   type: "number",
    //   disabled: true,
    // },
  ];
};
