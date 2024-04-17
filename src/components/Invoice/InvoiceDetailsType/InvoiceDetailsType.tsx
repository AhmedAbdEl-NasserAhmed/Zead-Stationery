import { InvoiceDetails } from "../../../interfaces/invoiceDetails";
import { ProductObject } from "../../../interfaces/productObject";
import BillTypeDetails from "./BillTypeDetails/BillTypeDetails";
import PurchaseTypeDetails from "./PurchaseTypeDetails/PurchaseTypeDetails";

interface Props {
  type: string;
  invoiceDetails: InvoiceDetails;
  product: ProductObject;
}

function InvoiceDetailsType({ type, product, invoiceDetails }: Props) {
  switch (type) {
    case "purchase":
      return (
        <PurchaseTypeDetails
          key={product.id}
          product={product}
          invoiceDetails={invoiceDetails}
        />
      );
    case "bill":
      return (
        <BillTypeDetails
          key={product.id}
          product={product}
          invoiceDetails={invoiceDetails}
        />
      );
    default:
  }
}

export default InvoiceDetailsType;
