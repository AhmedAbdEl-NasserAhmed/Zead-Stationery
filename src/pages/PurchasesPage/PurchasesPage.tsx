import { useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
// import PurchasesInvoice from "../../components/Purchases Invoice/PurchasesInvoice";
import AddPurchase from "../../features/AddPurchase";
import Container from "../../ui/Container/Container";
import styles from "./PurchasesPage.module.scss";
import Menus from "../../ui/Menus/Menus";
import { useGetPurchasesDataQuery } from "../../services/purchasesApi";
import { PurchaseInvoice } from "../../interfaces/purchaseInvoice";
import Invoice from "../../components/Invoice/Invoice";
import EditPurchase from "./EditPurchase/EditPurchase";

function PurchasesPage() {
  const { data, isFetching } = useGetPurchasesDataQuery("purchases");

  const [date, setDate] = useState<Date>(new Date());

  const filtredData = data?.filter(
    (invoice: PurchaseInvoice) => invoice.date === date.toDateString()
  );

  return (
    <Container>
      <div className={styles["purchase-page"]}>
        <AddPurchase />
        <DateBar date={date} setDate={setDate} title="Purchases Invoices" />
        <Menus>
          <Invoice
            falloutMessage="No Purchase Available"
            heading="Seller Name"
            OptionElement={EditPurchase}
            type="purchase"
            filtredData={filtredData}
            isFetching={isFetching}
            invoiceDetails={{
              name: "name",
              type: "type",
              countPieces: "piecesCount",
              pricePieces: "piecesPrice",
              piecesCount: "piecesCount",
              piecesPrice: "piecesPrice",
              total: {
                number1: "piecesCount",
                number2: "piecesPrice",
              },
            }}
          />
        </Menus>
      </div>
    </Container>
  );
}

export default PurchasesPage;
