import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import styles from "./Pagination.module.scss";

function Pagination({ currentPage, setCurrentPage, numPages }) {
  function incCurrentPage() {
    setCurrentPage((page: number) => page + 1);
  }

  function decCurrentPage() {
    setCurrentPage((page: number) => page - 1);
  }

  return (
    <div className={styles["pagination-container"]}>
      <button
        className={currentPage === 1 ? "disabled" : ""}
        disabled={currentPage === 1}
        onClick={() => decCurrentPage()}
      >
        <HiChevronLeft />
      </button>
      <h2 className="text-2xl">
        {" "}
        Current Page :
        <span className="text-purple-900 font-semibold"> {currentPage}</span>
      </h2>
      <button
        className={currentPage === numPages && numPages > 1 ? "disabled" : ""}
        disabled={currentPage === numPages && numPages > 1}
        onClick={() => incCurrentPage()}
      >
        <HiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
