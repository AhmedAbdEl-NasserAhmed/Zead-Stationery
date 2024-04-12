function calculatingTotalProfits(formData: object) {
  const totalProfits = Object.values(formData)
    .map((profit: number) => {
      if (!profit["product-billTotalPrice"]) {
        return (profit["product-billTotalPrice"] = 0);
      } else {
        return +profit["product-billTotalPrice"];
      }
    })
    .reduce((acc, profit) => {
      return acc + profit;
    }, 0);

  return totalProfits;
}

export default calculatingTotalProfits;
