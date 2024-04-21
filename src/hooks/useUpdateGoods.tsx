import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";

async function useUpdateGoods(productsData: ProductObject) {
  const identifer = productsData?.existedProductId
    ? productsData?.existedProductId
    : productsData?.id;

  const docRef = doc(db, "goods", identifer);

  if (!docRef) return;

  const docSnap = await getDoc(docRef);

  try {
    if (!docSnap.data()) {
      await setDoc(doc(db, "goods", productsData.id), {
        ...productsData,
      });

      return { data: productsData };
    } else {
      return { data: null };
    }
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateGoods;
