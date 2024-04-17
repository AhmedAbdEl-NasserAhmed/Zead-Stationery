export function formatErrorObject(data: object, escapeSpecialKey: string) {
  const newErrorData = {};

  Object.keys(data).forEach((key) => {
    if (key.startsWith(escapeSpecialKey)) {
      newErrorData[key] = data[key];
    } else if (!key.startsWith(escapeSpecialKey)) {
      for (const item in data[key]) {
        newErrorData[`${key}.${item}`] = data[key][item];
      }
    }
  });

  return newErrorData;
}
