import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";
import { PurchaseInvoice } from "../../../interfaces/purchaseInvoice";
import InvoiceListItem from "../InvocieListItem/InvoiceListItem";

interface Props {
  data: PurchaseInvoice[];
  falloutMessage: string;
  heading: string;
  type: string;
  invoiceDetails: object;
  OptionElement?: React.FC;
}

function InvoiceList({
  falloutMessage,
  heading,
  type,
  invoiceDetails,
  OptionElement,
  data,
}: Props) {
  if (!data.length)
    return <p className="text-2xl font-semibold">{falloutMessage}</p>;

  return (
    <ul className="flex flex-col gap-[4rem]">
      {data.map((invoice: InvoiceDataObject) => (
        <InvoiceListItem
          invoiceDetails={invoiceDetails}
          heading={heading}
          type={type}
          key={invoice.id}
          invoice={invoice}
          OptionElement={OptionElement}
          optionElementProps={invoice}
        />
      ))}
    </ul>
  );
}

export default InvoiceList;
