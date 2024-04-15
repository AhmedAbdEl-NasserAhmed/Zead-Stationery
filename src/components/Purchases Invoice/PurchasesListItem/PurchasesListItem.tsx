import { ProductObject } from "../../../interfaces/productObject";
import { PurchaseInvoice } from "../../../interfaces/purchaseInvoice";
import EditPurchase from "../../../pages/PurchasesPage/EditPurchase/EditPurchase";

import styles from "./PurchasesListItem.module.scss";

interface Props {
  invoice: PurchaseInvoice;
}

function PurchasesListItem({ invoice }: Props) {
  return (
    <li key={invoice.id} className={styles["invoice-container"]}>
      <div className={styles["invoice-container__details"]}>
        <h2>Seller Name : {invoice.sellerName}</h2>
        <h2>Date : {invoice.date}</h2>
      </div>
      <div className={styles["invoice-container__product-details"]}>
        <div className=" flex justify-between w-full col-span-full justify-self-start text-2xl">
          <h2>Invoice Products Details :</h2>
          <EditPurchase purchaseInvoice={invoice} />
        </div>

        {invoice?.products?.map((product: ProductObject) => {
          return (
            <h2 key={product.id}>
              {product.name} - {product.type} : {product.piecesCount} *{" "}
              {product.piecesPrice} ={" "}
              {Number(product.piecesCount) * Number(product.piecesPrice)} EGP
            </h2>
          );
        })}
      </div>

      <div className={styles["invoice-container__total"]}>
        <h2>
          Invoice Total :{" "}
          {invoice?.products?.reduce(
            (acc, product) =>
              acc + Number(product.piecesCount) * Number(product.piecesPrice),
            0
          )}{" "}
          EGP
        </h2>
      </div>
    </li>
  );
}

export default PurchasesListItem;
