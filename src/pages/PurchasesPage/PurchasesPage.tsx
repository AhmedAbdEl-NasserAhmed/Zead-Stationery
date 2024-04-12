import { useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
import PurchasesInvoice from "../../components/Purchases Invoice/PurchasesInvoice";
import AddPurchase from "../../features/AddPurchase";
import Container from "../../ui/Container/Container";
import styles from "./PurchasesPage.module.scss";

function PurchasesPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Container>
      <div className={styles["purchase-page"]}>
        <AddPurchase />
        <DateBar date={date} setDate={setDate} title="Purchases Invoices" />
        <PurchasesInvoice date={date} />
      </div>
    </Container>
  );
}

export default PurchasesPage;
