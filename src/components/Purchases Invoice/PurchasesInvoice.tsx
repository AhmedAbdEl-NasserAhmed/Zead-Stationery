import { useGetPurchasesDataQuery } from "../../services/purchasesApi";
import Spinner from "../../ui/Spinner/Spinner";
import PurchaseInvoiceList from "./PurchaseInvoiceList/PurchaseInvoiceList";

function PurchasesInvoice({ date }) {
  const { data, isFetching } = useGetPurchasesDataQuery("purchases");

  if (isFetching) return <Spinner />;

  return <PurchaseInvoiceList date={date} data={data} />;
}

export default PurchasesInvoice;
