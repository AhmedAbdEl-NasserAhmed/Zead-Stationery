import { useEffect, useState } from "react";
import DateBar from "../../components/DateBar/DateBar";
import AddPurchase from "../../features/AddPurchase";
import Container from "../../ui/Container/Container";
import styles from "./PurchasesPage.module.scss";
import Menus from "../../ui/Menus/Menus";
import { useGetPurchasesDataQuery } from "../../services/purchasesApi";
import { PurchaseInvoice } from "../../interfaces/purchaseInvoice";
import Invoice from "../../components/Invoice/Invoice";
import EditPurchase from "./EditPurchase/EditPurchase";
import Input from "../../ui/Input/Input";
import Pagination from "../../ui/Pagination/Pagination";
import { RESULT_PER_PAGE } from "../../constatnts/resultsPerPage";

function PurchasesPage() {
  const { data, isFetching } = useGetPurchasesDataQuery("purchases");

  const [date, setDate] = useState<Date>(new Date());

  const [sellerName, setSellerName] = useState<string>("");

  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    const currentIndex = (currentPage - 1) * RESULT_PER_PAGE;

    const endPage = RESULT_PER_PAGE * currentPage;

    setFilteredData(
      data
        ?.filter(
          (invoice: PurchaseInvoice) =>
            invoice.date === date.toDateString() &&
            String(invoice.sellerName)
              .toLowerCase()
              .includes(String(sellerName).toLowerCase())
        )
        .slice(currentIndex, endPage)
    );

    if (sellerName !== "") {
      setFilteredData(
        data?.filter(
          (invoice: PurchaseInvoice) =>
            invoice.date === date.toDateString() &&
            String(invoice.sellerName)
              .toLowerCase()
              .includes(String(sellerName).toLowerCase())
        )
      );
    }

    setNumPages(
      Math.ceil(
        data?.filter(
          (invoice: PurchaseInvoice) =>
            invoice.date === date.toDateString() &&
            String(invoice.sellerName)
              .toLowerCase()
              .includes(String(sellerName).toLowerCase())
        ).length / RESULT_PER_PAGE
      )
    );
  }, [data, sellerName, date, currentPage]);

  return (
    <Container>
      <div className={styles["purchase-page"]}>
        <AddPurchase />
        <DateBar date={date} setDate={setDate} title="Purchases Invoices" />
        <Input
          onChange={(e) => setSellerName(e.target.value)}
          name="sellerName"
          value={sellerName}
          style={{ width: `${100}%` }}
          placeholder="SELLER NAME"
          type="text"
        />
        <Menus>
          <Invoice
            falloutMessage="No Purchase Available"
            heading="Seller Name"
            OptionElement={EditPurchase}
            type="purchase"
            filteredData={filteredData}
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
      {!!filteredData?.length &&
        data?.filter(
          (invoice: PurchaseInvoice) =>
            invoice.date === date.toDateString() &&
            String(invoice.sellerName)
              .toLowerCase()
              .includes(String(sellerName).toLowerCase())
        )?.length > RESULT_PER_PAGE && (
          <Pagination
            numPages={numPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
    </Container>
  );
}

export default PurchasesPage;
