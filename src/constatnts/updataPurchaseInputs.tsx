import { ProductObject } from "../interfaces/productObject";

export const updatePurchaseInputs = function (
  product: ProductObject,
  id: string
) {
  return [
    {
      name: `${id}.product-name`,
      type: "text",
      label: "Product Name",
      defaultValue: product.name,
      disabled: false,
      placeholder: "Product Name",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
    },
    {
      name: `${id}.product-type`,
      type: "text",
      disabled: false,
      label: "Product Type",
      defaultValue: product.type,
      placeholder: "Product Type",
      validationInputs: {
        required: {
          value: true,
          message: "This field is required",
        },
      },
    },
    {
      name: `${id}.product-piecesCount`,
      type: "number",
      defaultValue: product.piecesCount,
      label: "Pieces Count",
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
      name: `${id}.product-piecesPrice`,
      type: "number",
      defaultValue: product.piecesPrice,
      label: "Pieces Price",
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
      name: `${id}.product-singleCount`,
      type: "number",
      defaultValue: product.singleCount,
      label: "Single Count",
      disabled: false,
      placeholder: "Single Piece Count",
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
      name: `${id}.product-singlePrice`,
      type: "number",
      label: "Single Count Price",
      defaultValue: product.singlePrice,
      disabled: false,
      placeholder: "Single Piece Price",
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
  ];
};
