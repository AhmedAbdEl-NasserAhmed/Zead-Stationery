function calculateTotalExpenses(formData, amount, setCurrentBalance) {
  const totalExpenes = Object.values(formData)
    .filter((key) => typeof key !== "string")
    .map(
      (product) =>
        +product["product-piecesCount"] * +product["product-piecesPrice"]
    )
    .reduce((acc, expense) => {
      if (expense >= 0 && expense < amount) {
        return acc + expense;
      } else {
        setCurrentBalance(0);
      }
    }, 0);

  return totalExpenes;
}

export default calculateTotalExpenses;
