import { ProductObject } from "../../../../interfaces/productObject";

interface Props {
  product: ProductObject;
}

function PurchaseTypeDetails({ product }: Props) {
  return (
    <h2 key={product.id}>
      {product.name} - {product.type} : {product.piecesCount} *{" "}
      {product.piecesCount} ={" "}
      {Number(product.piecesCount) * Number(product.piecesPrice)} EGP
    </h2>
  );
}

export default PurchaseTypeDetails;
