import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";
import { updatedPropertiesFactory } from "../helpers/updatedPropertiesFactory";

async function useUpdateExistedProduct({ productsData, id }) {
  console.log("productsData", productsData);

  const docRef = doc(db, "goods", id);

  const docSnap = await getDoc(docRef);

  if (!docSnap) return;

  const isAlreadyExisted: ProductObject = docSnap.data();

  console.log("isAlreadyExisted", isAlreadyExisted);

  if (!isAlreadyExisted || !docRef) return;

  const updatedObjectRef = doc(db, "goods", isAlreadyExisted?.id);

  const updatedObjectData = updatedPropertiesFactory(
    productsData,
    isAlreadyExisted
  );

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
