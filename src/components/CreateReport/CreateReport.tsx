import { useEffect, useState } from "react";
import { useGetBillslDataQuery } from "../../services/billsAPi";
import styles from "./CreateReport.module.scss";
import Spinner from "../../ui/Spinner/Spinner";
import { InvoiceDataObject } from "../../interfaces/invoiceDataObject";

function CreateReport() {
  const { data, isLoading } = useGetBillslDataQuery("bills");

  const [filtredData, setFiltredData] = useState<InvoiceDataObject[]>([]);

  useEffect(() => {
    const date = new Date();
    setFiltredData(
      data?.filter(
        (inovice) =>
          inovice.date === date.toDateString() && inovice.isRefunded === false
      )
    );
  }, [data]);

  if (isLoading) return <Spinner />;

  const totalPriceArray = [];

  if (filtredData) {
    for (const item of filtredData) {
      totalPriceArray.push(...item.products);
    }

    const totalPrice = totalPriceArray.reduce((acc, product) => {
      return acc + product.totalPrice;
    }, 0);

    return (
      <div className={styles["create-report"]}>
        <h2 className="text-3xl flex flex-col gap-5 items-center">
          <span> Daily Income </span>
          <span className="font-bold">{totalPrice} EGP</span>
        </h2>
      </div>
    );
  }
}

export default CreateReport;
