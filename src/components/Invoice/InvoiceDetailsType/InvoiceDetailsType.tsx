import { ProductObject } from "../../../interfaces/productObject";
import PurchaseTypeDetails from "./PurchaseTypeDetails/PurchaseTypeDetails";

interface Props {
  type: string;
  product: ProductObject;
}

function InvoiceDetailsType({ type, product }: Props) {
  switch (type) {
    case "purchase":
      return <PurchaseTypeDetails product={product} />;
    default:
  }
}

export default InvoiceDetailsType;
