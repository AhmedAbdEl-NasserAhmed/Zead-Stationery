import { useEffect, useState } from "react";
import { useGetBillslDataQuery } from "../../../../services/billsAPi";
import Invoice from "../../../../components/Invoice/Invoice";
import DateBar from "../../../../components/DateBar/DateBar";
import Input from "../../../../ui/Input/Input";

function ReturnedDataLink() {
  const { data, isFetching } = useGetBillslDataQuery("bills");

  const [date, setDate] = useState<Date>(new Date());

  const [filteredData, setFilteredData] = useState([]);

  const [buyerName, setBuyerName] = useState<string>("");

  useEffect(() => {
    setFilteredData(
      data?.filter(
        (invoice) =>
          invoice.date === date.toDateString() &&
          invoice.isRefunded &&
          String(invoice.buyerName)
            .toLowerCase()
            .includes(String(buyerName).toLowerCase())
      )
    );
  }, [data, buyerName, date]);

  return (
    <div className="flex flex-col gap-10">
      <DateBar date={date} setDate={setDate} title="Returned Bills Invoices" />
      <Input
        onChange={(e) => setBuyerName(e.target.value)}
        name="buyerName"
        value={buyerName}
        style={{ width: `${100}%` }}
        placeholder="BUYER NAME"
        type="text"
      />
      <Invoice
        heading="Buyer Name"
        showOptionMessage="Refunded"
        falloutMessage="No Retunred Goods Available"
        showOptionElementCondition="isRefunded"
        type="bill"
        filteredData={filteredData}
        isFetching={isFetching}
        invoiceDetails={{
          name: "product-name",
          type: "type",
          quantity: "quantity",
          singleCount: "singleCount",
          singlePrice: "singlePrice",
          total: {
            number1: "totalPrice",
          },
        }}
      />
    </div>
  );
}

export default ReturnedDataLink;
