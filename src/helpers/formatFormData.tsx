export function formatFormData(data: object) {
  const newData = {};

  Object.keys(data).forEach((key) => {
    if (key !== "sellerName") {
      for (const item in data[key]) {
        newData[`${key}.${item}`] = data[key][item];
      }
    }
  });

  return newData;
}
