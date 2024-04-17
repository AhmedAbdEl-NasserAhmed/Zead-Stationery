import { useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
import AddBill from "../../features/AddBill";
import Container from "../../ui/Container/Container";
import styles from "./BillsPage.module.scss";
import Menus from "../../ui/Menus/Menus";
import Invoice from "../../components/Invoice/Invoice";
import { useGetBillslDataQuery } from "../../services/billsAPi";
import RefundBill from "./RefundBill/RefundBill";

function BillsPage() {
  const [date, setDate] = useState<Date>(new Date());

  const { data, isFetching } = useGetBillslDataQuery("bills");

  const filtredData = data?.filter(
    (invoice) => invoice.date === date.toDateString()
  );

  return (
    <Container>
      <div className={styles["bills-page"]}>
        <AddBill />
        <DateBar date={date} setDate={setDate} title="Bill Invoices" />
        <Menus>
          <Invoice
            falloutMessage="No Bills Available"
            heading="Buyer Name"
            OptionElement={RefundBill}
            type="bill"
            filtredData={filtredData}
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
    </Container>
  );
}

export default BillsPage;
