import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";
import { updatedPropertiesFactory } from "../helpers/updatedPropertiesFactory";

async function useUpdateExistedProduct({ invoiceType, productsData, id }) {
  const indentifier = productsData.existedProductId
    ? productsData.existedProductId
    : id;

  const docRef = doc(db, "goods", indentifier);

  const docSnap = await getDoc(docRef);

  if (!docSnap) return;

  const isAlreadyExisted: ProductObject = docSnap.data();

  if (!isAlreadyExisted || !docRef) return;

  const updatedObjectRef = doc(db, "goods", isAlreadyExisted?.id);

  console.log("productsData", productsData);

  const updatedObjectData = updatedPropertiesFactory(
    invoiceType,
    productsData,
    isAlreadyExisted
  );

  try {
    if (isAlreadyExisted) {
      await updateDoc(updatedObjectRef, {
        ...updatedObjectData,
      });
      return { data: "ok" };
    }
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateExistedProduct;
