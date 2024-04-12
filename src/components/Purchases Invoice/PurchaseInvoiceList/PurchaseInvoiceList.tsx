import { PurchaseInvoice } from "../../../interfaces/purchaseInvoice";
import PurchasesListItem from "../PurchasesListItem/PurchasesListItem";

interface Props {
  data: PurchaseInvoice[];
  date: Date;
}

function PurchaseInvoiceList({ data, date }: Props) {
  if (!data.length) return <p>No Date Available !</p>;

  const filteredData = data?.filter(
    (invoice: PurchaseInvoice) => invoice.date === date.toDateString()
  );

  if (!filteredData.length)
    return <p className="text-2xl font-semibold">No Purchases Invoices</p>;

  return (
    <ul className="flex flex-col gap-[4rem]">
      {filteredData.map((invoice: PurchaseInvoice) => (
        <PurchasesListItem key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}

export default PurchaseInvoiceList;
