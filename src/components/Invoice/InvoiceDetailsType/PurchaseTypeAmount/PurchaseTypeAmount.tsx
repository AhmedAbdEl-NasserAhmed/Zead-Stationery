function PurchaseTypeAmount({ invoice, invoiceDetails }) {
  return (
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
  );
}

export default PurchaseTypeAmount;
