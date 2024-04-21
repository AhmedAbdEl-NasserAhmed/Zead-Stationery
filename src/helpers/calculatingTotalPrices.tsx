export function calculatingTotalPrices({ bills }) {
  const filtredData = bills?.filter((inovice) => inovice.isRefunded === false);

  const newDataArray = [];

  if (filtredData) {
    for (const item of filtredData) {
      newDataArray.push(...item.products);
    }
  }

  const totalPrice = newDataArray.reduce((acc, product) => {
    return acc + product.totalPrice;
  }, 0);

  return { totalPrice, newDataArray };
}
