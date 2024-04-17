// function calculatingTotalProfits(formData: object) {
//   const totalProfits = Object.values(formData)
//     .map((profit: number) => {
//
//       if (!profit["totalPrice"]) {
//         return (profit["totalPrice"] = 0);
//       } else {
//         return +profit["totalPrice"];
//       }
//     })
//     .reduce((acc, profit) => {
//       return acc + profit;
//     }, 0);

//   console.log("totalProfits", totalProfits);

//   return totalProfits;
// }

// export default calculatingTotalProfits;

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

  // console.log("totalProfits", totalProfits);

  return totalProfits;
}

export default calculatingTotalProfits;
