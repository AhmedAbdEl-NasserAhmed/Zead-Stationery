import { ProductObject } from "../interfaces/productObject";

export function updateProductTableContent(product: ProductObject) {
  return [
    {
      name: "Pieces Quantity",
      serverKey: "piecesCount",
      value: product?.piecesCount,
    },

    {
      name: "Piece Price",
      serverKey: "piecesPrice",
      value: product?.piecesPrice,
    },

    {
      name: " Units In One Piece",
      serverKey: "singleCount",
      value: product?.singleCount,
    },

    {
      name: "Single Piece Price",
      serverKey: "singlePrice",
      value: product?.singlePrice,
    },
    {
      name: "Total Single Product Count",
      serverKey: null,
      value: +product?.piecesCount * +product?.singleCount,
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
      value: Number(
        (+product?.["singlePrice"] * +product?.["singleCount"] -
          +product?.["piecesPrice"]) /
          +product?.["singleCount"]
      ).toFixed(2),
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

// import { ProductObject } from "../interfaces/productObject";

// export function updateProductTableContent(product: ProductObject) {
//   return [
//     { name: " Product Name", value: product.name },
//     {
//       name: "Product Type",
//       value: product.type,
//     },
//     {
//       name: "Pieces Quantity",
//       value: product.piecesCount,
//     },

//     {
//       name: " Units In One Piece",
//       value: product.piecesCount,
//     },

//     {
//       name: "Total Product Quantity ",
//       value: product.piecesCount * product.singleCount,
//     },

//     {
//       name: "Piece Price",
//       value: product.piecesPrice,
//     },

//     {
//       name: "Single Piece Price",
//       value: product.singlePrice,
//     },
//     {
//       name: "Profit Of Piece",
//       value:
//         +product["singlePrice"] * +product["singleCount"] -
//         +product["piecesPrice"],
//     },
//     {
//       name: "Profit Of Single Piece",
//       value: Math.ceil(
//         (+product["singlePrice"] * +product["singleCount"] -
//           +product["piecesPrice"]) /
//           +product["singleCount"]
//       ),
//     },
//     {
//       name: "Profit Percentage %",
//       value:
//         ((+product["singlePrice"] * +product["singleCount"] -
//           +product["piecesPrice"]) *
//           +product["piecesCount"]) /
//         100,
//     },
//     {
//       name: "Actions",
//     },
//   ];
// }
