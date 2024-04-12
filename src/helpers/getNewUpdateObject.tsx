function getNewUpdateObject(existedObject, currentObject) {
  const newUpdatedArray = [];

  if (currentObject?.name === existedObject?.name) {
    newUpdatedArray.push(currentObject);
  }

  const newUpdatedObject = newUpdatedArray?.find(
    (product) => product?.name === existedObject?.name
  );

  return newUpdatedObject;
}

export default getNewUpdateObject;
