export function formatFormData(data: object, escapeSpecialKey: string) {
  const newData = {};

  Object.keys(data).forEach((key) => {
    if (key !== escapeSpecialKey) {
      for (const item in data[key]) {
        newData[`${item}`] = data[key][item];
      }
    }
  });

  return newData;
}
