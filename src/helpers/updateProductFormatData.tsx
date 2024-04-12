function updateProductFormatData(formData) {
  const newData = {};

  for (const key in formData) {
    if (!key.includes("product-")) {
      Object.assign(newData, formData[key]);
    } else if (key.includes("product")) {
      const keys = key.split(".");
      const newKeys = keys[1];
      newData[newKeys] = formData[key];
    }
  }

  return newData;
}

export default updateProductFormatData;
