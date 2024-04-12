export function modifyProductProperties(arr) {
  if (!arr) return;

  const newModeifiedArray = arr.map((obj) => {
    const modeifiedObj = {};

    for (const key in obj) {
      if (key.startsWith("product-")) {
        const parts = key.split("-");
        const newKey = parts[2];
        modeifiedObj[newKey] = obj[key];
      } else {
        modeifiedObj[key] = obj[key];
      }
    }

    return modeifiedObj;
  });

  return newModeifiedArray;
}
