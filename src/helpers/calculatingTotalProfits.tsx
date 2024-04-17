function calculatingTotalProfits(formData: object) {
  const totalProfits = Object.keys(formData)
    .map((key: string) => {
      if (key !== "buyerName") {
        if (!formData[key]["totalPrice"]) {
          return (formData[key]["totalPrice"] = 0);
        } else {
          return +formData[key]["totalPrice"];
        }
      }
    })
    .reduce((acc, profit) => {
      if (!profit) {
        return null;
      } else {
        return acc + profit;
      }
    }, 0);

  return totalProfits;
}

export default calculatingTotalProfits;
