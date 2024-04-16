import { useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
import AddBill from "../../features/AddBill";
import Container from "../../ui/Container/Container";
import styles from "./BillsPage.module.scss";

function BillsPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Container>
      <div className={styles["bills-page"]}>
        <AddBill />
        <DateBar date={date} setDate={setDate} title="Bill Invoices" />
      </div>
    </Container>
  );
}

export default BillsPage;
