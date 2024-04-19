import { useEffect, useState } from "react";
import Invoice from "../../components/Invoice/Invoice";
import Container from "../../ui/Container/Container";
import styles from "./ReturnedGoodsPage.module.scss";
import { useGetBillslDataQuery } from "../../services/billsAPi";
import DateBar from "../../components/DateBar/DateBar";
import Input from "../../ui/Input/Input";

function ReturnedGoodsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const [filteredData, setFilteredData] = useState([]);

  const [buyerName, setBuyerName] = useState<string>("");

  const { data, isFetching } = useGetBillslDataQuery("bills");

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
    <Container>
      <div className={styles["returnedGoods-page"]}>
        <h2 className="text-3xl font-bold">Returned Goods</h2>
        <DateBar
          date={date}
          setDate={setDate}
          title="Returned Bills Invoices"
        />
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
    </Container>
  );
}

export default ReturnedGoodsPage;
