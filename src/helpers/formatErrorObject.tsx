export function formatErrorObject(data: object) {
  const newErrorData = {};

  Object.keys(data).forEach((key) => {
    if (key.startsWith("sellerName")) {
      newErrorData[key] = data[key];
    } else if (!key.startsWith("sellerName")) {
      for (const item in data[key]) {
        newErrorData[`${key}.${item}`] = data[key][item];
      }
    }
  });

  return newErrorData;
}
