import { PurchaseInvoice } from "../../interfaces/purchaseInvoice";
import Spinner from "../../ui/Spinner/Spinner";
import InvoiceList from "./InvoiceList/InvoiceList";

interface Props {
  filteredData: PurchaseInvoice[];
  isFetching: boolean;
  invoiceDetails: object;
  heading?: string;
  type?: string;
  falloutMessage?: string;
  OptionElement?: React.FC;
  showOptionElementCondition?: string;
  showOptionMessage?: string;
}

function Invoice({
  type,
  filteredData,
  isFetching,
  falloutMessage,
  heading,
  invoiceDetails,
  OptionElement,
  showOptionElementCondition,
  showOptionMessage,
}: Props) {
  if (isFetching) return <Spinner />;

  return (
    <InvoiceList
      showOptionMessage={showOptionMessage}
      showOptionElementCondition={showOptionElementCondition}
      invoiceDetails={invoiceDetails}
      heading={heading}
      type={type}
      falloutMessage={falloutMessage}
      OptionElement={OptionElement}
      data={filteredData}
    />
  );
}

export default Invoice;
