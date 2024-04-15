export const billFormInputs = function (
  rowId: string,
  formData: object,
  setSelectedBillProductQuantity: (number: number) => void,
  setCurrentRowId: (rowId: string) => void
) {
  return [
    {
      id: `${rowId}.productId`,
      name: `${rowId}.productId`,
      type: "text",
      disabled: true,
      placeholder: "Product ID ",
      label: "Product ID",
    },
    {
      id: `${rowId}.soldPieces`,
      name: `${rowId}.soldPieces`,
      type: "number",
      disabled: true,
      placeholder: "Pieces Count",
      label: "Sold Pieces",
    },
    {
      id: `${rowId}.singleCount`,
      name: `${rowId}.singleCount`,
      type: "number",
      disabled: true,
      placeholder: "Single Count",
      label: "Total Single Counts",
    },

    {
      id: `${rowId}.piecesCount`,
      name: `${rowId}.piecesCount`,
      type: "number",
      defaultValue: 0,
      disabled: true,
      placeholder: "Pieces Count",
      label: "Total Product items",
    },
    {
      id: `${rowId}.singlePrice`,
      name: `${rowId}.singlePrice`,
      type: "number",
      disabled: true,
      placeholder: "Single Piece Price",
      label: "Single item Price",
    },

    {
      id: `${rowId}.quantity`,
      name: `${rowId}.quantity`,
      label: "Sold Quantity",
      type: "number",
      disabled: false,
      placeholder: "Quantity",
      onClick() {
        setSelectedBillProductQuantity(
          +formData[rowId]["piecesCount"] + +formData[rowId]["quantity"]
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
            +formData?.[rowId]?.["piecesCount"] +
            +formData?.[rowId]?.["quantity"],
          message: "This field should  be less than Pieces Quantity ",
        },
      },
    },
    {
      id: `${rowId}.totalPrice`,
      name: `${rowId}.totalPrice`,
      type: "number",
      label: "Total Price",
      defaultValue: 0,
      disabled: true,
      placeholder: "Total Price",
    },
  ];
};
