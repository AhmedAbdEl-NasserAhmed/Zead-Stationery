export const purchaseFormInputs = function (
  rowId: string,
  rowIdsArray: string[]
) {
  return [
    {
      name: `${rowId}.product-type`,
      type: "text",
      disabled: rowIdsArray.includes(rowId),
      placeholder: "Product Type",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
    },
    {
      name: `${rowId}.product-piecesCount`,
      type: "number",
      disabled: false,
      placeholder: "Pieces Count",
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
      type: "number",
      disabled: false,
      placeholder: "Pieces Price",
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
      type: "number",
      disabled: false,
      placeholder: "Single Piece Count",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
    },

    {
      name: `${rowId}.product-singlePrice`,
      type: "number",
      disabled: false,
      placeholder: "Single Piece Price",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
    },
    {
      name: `${rowId}.product-existedProductId`,
      type: "text",
      disabled: true,
      placeholder: "Existed Product Id",
    },
  ];
};
