import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";
import { InvoiceDetails } from "../../../interfaces/invoiceDetails";
import { ProductObject } from "../../../interfaces/productObject";
import BillTypeAmount from "../InvoiceDetailsType/BillTypeAmount/BillTypeAmount";

import InvoiceDetailsType from "../InvoiceDetailsType/InvoiceDetailsType";
import PurchaseTypeAmount from "../InvoiceDetailsType/PurchaseTypeAmount/PurchaseTypeAmount";
import styles from "./InvoiceListItem.module.scss";

interface OptionElementProps {
  optionElementProps: InvoiceDataObject;
}

interface Props {
  invoice: InvoiceDataObject;
  heading: string;
  type: string;
  invoiceDetails: InvoiceDetails;
  optionElementProps: InvoiceDataObject;
  OptionElement: React.ComponentType<OptionElementProps>;
  showOptionElementCondition?: string;
  showOptionMessage?: string;
}

function InvoiceListItem({
  invoice,
  type,
  heading,
  invoiceDetails,
  OptionElement,
  optionElementProps,
  showOptionElementCondition,
  showOptionMessage,
}: Props) {
  const nameType = type === "purchase" ? "sellerName" : "buyerName";

  return (
    <li key={invoice.id} className={styles["invoice-container"]}>
      <div className={styles["invoice-container__details"]}>
        <h2>
          {heading} : {invoice[nameType]}
        </h2>
        <h2>Date : {invoice.date}</h2>
      </div>
      <div className={styles["invoice-container__product-details"]}>
        <div className=" flex justify-between w-full col-span-full justify-self-start text-2xl">
          <h2>Invoice Products Details :</h2>

          {invoice[showOptionElementCondition]
            ? showOptionMessage
            : OptionElement && (
                <OptionElement optionElementProps={optionElementProps} />
              )}
        </div>

        {invoice?.products?.map((product: ProductObject) => {
          return (
            <InvoiceDetailsType
              product={product}
              key={product.id}
              type={type}
              invoiceDetails={invoiceDetails}
            />
          );
        })}
      </div>

      <div className={styles["invoice-container__total"]}>
        {type === "purchase" ? (
          <PurchaseTypeAmount
            invoice={invoice}
            invoiceDetails={invoiceDetails}
          />
        ) : (
          <BillTypeAmount invoice={invoice} invoiceDetails={invoiceDetails} />
        )}
      </div>
    </li>
  );
}

export default InvoiceListItem;
