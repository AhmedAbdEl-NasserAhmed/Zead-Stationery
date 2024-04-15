function calculatingTotalProfits(formData: object) {
  const totalProfits = Object.values(formData)
    .map((profit: number) => {
      if (!profit["totalPrice"]) {
        return (profit["totalPrice"] = 0);
      } else {
        return +profit["totalPrice"];
      }
    })
    .reduce((acc, profit) => {
      return acc + profit;
    }, 0);

  return totalProfits;
}

export default calculatingTotalProfits;
