import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { RESULT_PER_PAGE } from "../../constatnts/resultsPerPage";
import styles from "./PaginationNumbers.module.scss";
import { useEffect, useState } from "react";

function PaginationNumbers({ data, setCurrentPage, date, currentPage }) {
  const indexsLength = Math.ceil(
    data?.filter(
      (invoice) => invoice.date === date.toDateString() && !invoice.isRefunded
    ).length / RESULT_PER_PAGE
  );

  const paginationIndex = [];

  const [prevPages, setPrevPages] = useState<number>(0);

  const [nextPages, setNextPages] = useState<number>(RESULT_PER_PAGE);

  const [indexLeft, setIndexsLeft] = useState<number>(paginationIndex.length);

  const [rangeArray, setRangeArray] = useState([]);

  const [firstIndex, setFirstIndex] = useState(rangeArray[0]);

  useEffect(() => {
    setFirstIndex(rangeArray[0]);
  }, [rangeArray]);

  useEffect(() => {
    setRangeArray(paginationIndex.slice(prevPages, nextPages));
  }, [prevPages, nextPages]);

  useEffect(() => {
    //
    setIndexsLeft(paginationIndex.length);

    setCurrentPage(firstIndex);
  }, [paginationIndex.length, firstIndex]);

  for (let i = 0; i < indexsLength; i++) {
    paginationIndex.push(i + 1);
  }

  console.log(currentPage);

  function navigateNextPages() {
    if (indexLeft <= RESULT_PER_PAGE) return;

    if (indexLeft > RESULT_PER_PAGE) {
      setPrevPages((page) => page + RESULT_PER_PAGE);

      setNextPages((page) => page + RESULT_PER_PAGE);
    } else {
      setPrevPages(paginationIndex.length - indexLeft);

      setNextPages(indexLeft);
    }

    setIndexsLeft((indexLeft) => indexLeft - RESULT_PER_PAGE);
  }

  function navigatePrevPages() {
    if (prevPages === 0) return;

    setPrevPages((page) => page - RESULT_PER_PAGE);

    setNextPages((page) => page - RESULT_PER_PAGE);

    setIndexsLeft((indexLeft) => indexLeft + RESULT_PER_PAGE);
  }

  return (
    <div className="flex items-center gap-10 justify-center">
      <div className="flex gap-10">
        <button
          onClick={() => navigatePrevPages()}
          className={styles["pagination-button"]}
        >
          <HiChevronDoubleLeft />
        </button>

        <button
          onClick={() => {
            if (currentPage === 1) return;

            if (prevPages >= RESULT_PER_PAGE && currentPage === rangeArray[0]) {
              setPrevPages((page) => page - RESULT_PER_PAGE);

              setNextPages((page) => page - RESULT_PER_PAGE);
            }
            setCurrentPage((page: number) => page - 1);
          }}
          className={styles["pagination-button"]}
        >
          <HiChevronLeft />
        </button>
      </div>

      <ul className={styles["pagination-numbers"]}>
        {rangeArray.map((item) => {
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
      <div className="flex gap-10">
        <button
          onClick={() => {
            if (currentPage === paginationIndex[paginationIndex.length - 1])
              return;
            if (
              indexLeft > RESULT_PER_PAGE &&
              currentPage === rangeArray[rangeArray.length - 1]
            ) {
              setPrevPages((page) => page + RESULT_PER_PAGE);

              setNextPages((page) => page + RESULT_PER_PAGE);
            }
            setCurrentPage((page: number) => page + 1);
          }}
          className={styles["pagination-button"]}
        >
          <HiChevronRight />
        </button>

        <button
          onClick={() => navigateNextPages()}
          className={styles["pagination-button"]}
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}

export default PaginationNumbers;
