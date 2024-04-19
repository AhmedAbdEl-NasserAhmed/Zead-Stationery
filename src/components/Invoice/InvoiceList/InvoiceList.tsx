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
  showOptionElementCondition?: string;
  showOptionMessage?: string;
}

function InvoiceList({
  falloutMessage,
  heading,
  type,
  invoiceDetails,
  showOptionElementCondition,
  OptionElement,
  data,
  showOptionMessage,
}: Props) {
  if (!data?.length)
    return <p className="text-2xl font-semibold">{falloutMessage}</p>;

  return (
    <ul className="flex flex-col gap-[4rem]">
      {data?.map((invoice: InvoiceDataObject) => {
        return (
          <InvoiceListItem
            showOptionMessage={showOptionMessage}
            showOptionElementCondition={showOptionElementCondition}
            key={invoice.id}
            invoiceDetails={invoiceDetails}
            heading={heading}
            type={type}
            invoice={invoice}
            OptionElement={OptionElement}
            optionElementProps={invoice}
          />
        );
      })}
    </ul>
  );
}

export default InvoiceList;
