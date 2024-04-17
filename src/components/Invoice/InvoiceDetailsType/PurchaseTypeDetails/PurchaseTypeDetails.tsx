import { InvoiceDetails } from "../../../../interfaces/invoiceDetails";
import { ProductObject } from "../../../../interfaces/productObject";

interface Props {
  product: ProductObject;
  invoiceDetails: InvoiceDetails;
}

function PurchaseTypeDetails({ product, invoiceDetails }: Props) {
  return (
    <h2 key={product.id}>
      {product[invoiceDetails.name]} - {product[invoiceDetails.type]} :{" "}
      {product[invoiceDetails.piecesCount]} *{" "}
      {product[invoiceDetails.piecesCount]} ={" "}
      {Number(product[invoiceDetails.piecesCount]) *
        Number(product[invoiceDetails.piecesPrice])}{" "}
      EGP
    </h2>
  );
}

export default PurchaseTypeDetails;
