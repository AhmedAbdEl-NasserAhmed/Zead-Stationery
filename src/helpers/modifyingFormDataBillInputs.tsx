export function modifyingFormDataBillInputs(formData) {
  const serverData = [];

  let dataObject = {
    date: new Date(Date.now()).toDateString(),
  };

  for (const [key, value] of Object.entries(formData)) {
    if (key === "buyerName") {
      dataObject[key] = value;
    } else {
      dataObject = { ...dataObject, ...formData[key] };
      serverData.push(dataObject);
    }
  }

  return serverData;
}
