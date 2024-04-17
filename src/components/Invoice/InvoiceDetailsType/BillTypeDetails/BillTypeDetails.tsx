import { InvoiceDetails } from "../../../../interfaces/invoiceDetails";
import { ProductObject } from "../../../../interfaces/productObject";

interface Props {
  product: ProductObject;
  invoiceDetails: InvoiceDetails;
}

function BillTypeDetails({ product, invoiceDetails }: Props) {
  return (
    <h2 key={product.id}>
      {product[invoiceDetails.name]} : {product[invoiceDetails.quantity]} Unit *{" "}
      {product[invoiceDetails.singlePrice]} single Price ={" "}
      {Number(product[invoiceDetails.total.number1])}
      EGP
    </h2>
  );
}

export default BillTypeDetails;
