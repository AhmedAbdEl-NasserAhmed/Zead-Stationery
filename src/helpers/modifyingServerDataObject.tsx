export function modifyingServerData(formData) {
  const serverData = Object.keys(formData).map((productKey) => {
    const newDataObject = {};

    for (const item in formData[productKey]) {
      newDataObject[item] = formData[productKey][item];
    }
    return newDataObject;
  });
  return serverData;
}
