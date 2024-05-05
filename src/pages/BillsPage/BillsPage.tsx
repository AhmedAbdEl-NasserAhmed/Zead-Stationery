import { useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
import AddBill from "../../features/AddBill";
import Container from "../../ui/Container/Container";
import styles from "./BillsPage.module.scss";
import Menus from "../../ui/Menus/Menus";
import Invoice from "../../components/Invoice/Invoice";
import { useGetBillslDataQuery } from "../../services/billsAPi";
import RefundBill from "./RefundBill/RefundBill";
import Input from "../../ui/Input/Input";
import PaginationNumbers from "../../ui/PaginationNumbers/PaginationNumbers";
import usePaginationNumbers from "../../hooks/usePaginationNumbers";

function BillsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const [filteredData, setFilteredData] = useState([]);

  const [buyerName, setBuyerName] = useState<string>("");

  const { data, isFetching } = useGetBillslDataQuery("bills");

  const [currentPage, setCurrentPage] = useState<number>(1);

  usePaginationNumbers({ data, buyerName, date, setFilteredData, currentPage });

  return (
    <Container>
      <div className={styles["bills-page"]}>
        <AddBill />
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
      <PaginationNumbers
        currentPage={currentPage}
        date={date}
        data={data}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default BillsPage;
