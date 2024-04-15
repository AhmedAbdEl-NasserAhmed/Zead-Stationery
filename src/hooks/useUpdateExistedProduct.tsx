import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";
import { updatedPropertiesFactory } from "../helpers/updatedPropertiesFactory";

async function useUpdateExistedProduct({ productsData, id }) {
  const docRef = doc(db, "goods", id);

  const docSnap = await getDoc(docRef);

  if (!docSnap) return;

  const isAlreadyExisted: ProductObject = docSnap.data();

  if (!isAlreadyExisted || !docRef) return;

  const updatedObjectRef = doc(db, "goods", isAlreadyExisted?.id);

  const updatedProperties: ProductObject = {};

  const updatedObjectData = updatedPropertiesFactory(
    productsData,
    updatedProperties,
    isAlreadyExisted
  );

  console.log();

  try {
    await updateDoc(updatedObjectRef, {
      ...updatedObjectData,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateExistedProduct;
