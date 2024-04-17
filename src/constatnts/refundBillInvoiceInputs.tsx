import { ProductObject } from "../interfaces/productObject";

export const refundBillInvoiceInputs = function (product: ProductObject) {
  return [
    {
      id: `${product.id}.name`,
      name: `${product.id}.name`,
      defaultValue: product["product-name"],
      type: "text",
      disabled: true,
      placeholder: " Name ",
      label: "Product Name",
    },
    {
      id: `${product.id}.id`,
      name: `${product.id}.id`,
      defaultValue: product.id,
      type: "text",
      disabled: true,
      placeholder: " ID ",
      label: "Product ID",
    },
    {
      id: `${product.id}.soldPieces`,
      name: `${product.id}.soldPieces`,
      defaultValue: product.soldPieces,
      type: "number",
      disabled: true,
      placeholder: "Pieces Count",
      label: "Sold Pieces",
    },
    {
      id: `${product.id}.quantity`,
      name: `${product.id}.quantity`,
      defaultValue: product.quantity,
      label: "Sold Quantity",
      type: "number",
      disabled: true,
      placeholder: "Quantity",
    },
    {
      id: `${product.id}.totalPrice`,
      name: `${product.id}.totalPrice`,
      defaultValue: product.totalPrice,
      type: "number",
      label: "Total Price",
      disabled: true,
      placeholder: "Total Price",
    },
  ];
};
