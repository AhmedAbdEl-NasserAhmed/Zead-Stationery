import { RESULT_PER_PAGE } from "../../constatnts/resultsPerPage";
import styles from "./PaginationNumbers.module.scss";

function PaginationNumbers({ data, setCurrentPage, date, currentPage }) {
  const indexsLength = Math.ceil(
    data?.filter(
      (invoice) => invoice.date === date.toDateString() && !invoice.isRefunded
    ).length / RESULT_PER_PAGE
  );

  const pagiantionIndex = [];

  for (let i = 0; i < indexsLength; i++) {
    pagiantionIndex.push(i + 1);
  }

  return (
    <ul className={styles["pagination-numbers"]}>
      {pagiantionIndex.map((item) => {
        return (
          <li
            className={item === currentPage ? "active-index" : ""}
            key={item}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default PaginationNumbers;
