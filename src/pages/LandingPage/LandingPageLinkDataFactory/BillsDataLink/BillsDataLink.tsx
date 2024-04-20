import { useEffect, useState } from "react";
import DateBar from "../../../../components/DateBar/DateBar";
import { useGetBillslDataQuery } from "../../../../services/billsAPi";
import Menus from "../../../../ui/Menus/Menus";
import Invoice from "../../../../components/Invoice/Invoice";
import Input from "../../../../ui/Input/Input";
import RefundBill from "../../../BillsPage/RefundBill/RefundBill";

function BillsDataLink() {
  const { data, isFetching } = useGetBillslDataQuery("bills");

  const [date, setDate] = useState<Date>(new Date());

  const [filteredData, setFilteredData] = useState([]);

  const [buyerName, setBuyerName] = useState<string>("");

  useEffect(() => {
    setFilteredData(
      data?.filter(
        (invoice) =>
          invoice.date === date.toDateString() &&
          !invoice.isRefunded &&
          String(invoice.buyerName)
            .toLowerCase()
            .includes(String(buyerName).toLowerCase())
      )
    );
  }, [data, buyerName, date]);

  return (
    <div className="flex flex-col gap-10">
      <DateBar date={date} setDate={setDate} title="Bill Invoices" />
      <Input
        onChange={(e) => setBuyerName(e.target.value)}
        name="buyerName"
        value={buyerName}
        style={{ width: `${100}%` }}
        placeholder="BUYER NAME"
        type="text"
      />
      <Menus>
        <Invoice
          showOptionElementCondition="isRefunded"
          showOptionMessage="Refunded"
          falloutMessage="No Bills Available"
          heading="Buyer Name"
          OptionElement={RefundBill}
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
      </Menus>
    </div>
  );
}

export default BillsDataLink;
