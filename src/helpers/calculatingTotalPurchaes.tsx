export function calculatingTotalPurchases({ purchases }) {
  const purchasesArray = [];

  if (purchases) {
    for (const item of purchases) {
      const modifiedObject = {
        date: item.date,
      };
      for (const product of item.products) {
        for (const key in product) {
          modifiedObject[key] = product[key];
        }
      }
      purchasesArray.push(modifiedObject);
    }
  }

  return purchasesArray;
}
