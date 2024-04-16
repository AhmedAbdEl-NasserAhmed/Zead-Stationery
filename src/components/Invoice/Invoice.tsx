import Spinner from "../../ui/Spinner/Spinner";
import InvoiceList from "./InvoiceList/InvoiceList";

function Invoice({
  type,
  filtredData,
  isFetching,
  falloutMessage,
  heading,
  invoiceDetails,
  OptionElement,
}) {
  if (isFetching) return <Spinner />;

  return (
    <InvoiceList
      invoiceDetails={invoiceDetails}
      heading={heading}
      type={type}
      falloutMessage={falloutMessage}
      OptionElement={OptionElement}
      data={filtredData}
    />
  );
}

export default Invoice;
