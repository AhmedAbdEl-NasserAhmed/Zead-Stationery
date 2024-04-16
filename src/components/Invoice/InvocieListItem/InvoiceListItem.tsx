import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";
import { InvoiceDetails } from "../../../interfaces/invoiceDetails";
import { ProductObject } from "../../../interfaces/productObject";

import InvoiceDetailsType from "../InvoiceDetailsType/InvoiceDetailsType";
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
}

function InvoiceListItem({
  invoice,
  type,
  heading,
  invoiceDetails,
  OptionElement,
  optionElementProps,
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
          <OptionElement optionElementProps={optionElementProps} />
        </div>

        {invoice?.products?.map((product: ProductObject) => {
          return (
            <InvoiceDetailsType
              key={product.id}
              type={type}
              product={product}
            />
          );
        })}
      </div>

      <div className={styles["invoice-container__total"]}>
        <h2>
          Invoice Total :{" "}
          {invoice?.products?.reduce(
            (acc, product) =>
              acc +
              Number(product[invoiceDetails.total.number1]) *
                Number(product[invoiceDetails.total.number2]),
            0
          )}{" "}
          EGP
        </h2>
      </div>
    </li>
  );
}

export default InvoiceListItem;
