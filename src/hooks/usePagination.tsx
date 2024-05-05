import { useEffect } from "react";
import { RESULT_PER_PAGE } from "../constatnts/resultsPerPage";
import { PurchaseInvoice } from "../interfaces/purchaseInvoice";

function usePagination({
  currentPage,
  data,
  setFilteredData,
  date,
  sellerName,
  setNumPages,
}) {
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
  }, [data, sellerName, date, currentPage, setFilteredData, setNumPages]);
}

export default usePagination;
