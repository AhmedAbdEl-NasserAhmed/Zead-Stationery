import { useEffect } from "react";
import { RESULT_PER_PAGE } from "../constatnts/resultsPerPage";

function usePaginationNumbers({
  setFilteredData,
  data,
  date,
  buyerName,
  currentPage,
}) {
  useEffect(() => {
    const currentIndex = (currentPage - 1) * RESULT_PER_PAGE;

    const endPage = RESULT_PER_PAGE * currentPage;

    setFilteredData(
      data
        ?.filter(
          (invoice) =>
            invoice.date === date.toDateString() &&
            !invoice.isRefunded &&
            String(invoice.buyerName)
              .toLowerCase()
              .includes(String(buyerName).toLowerCase())
        )
        .slice(currentIndex, endPage)
    );

    if (buyerName !== "") {
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
    }
  }, [data, date, buyerName, setFilteredData, currentPage]);
}

export default usePaginationNumbers;
