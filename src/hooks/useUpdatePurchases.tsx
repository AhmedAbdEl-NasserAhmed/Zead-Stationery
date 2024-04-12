import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function useUpdatePurchases(data) {
  try {
    await setDoc(doc(db, "purchases", data.id), {
      ...data,
    });
    return { data };
  } catch (err) {
    console.error(err);
  }
}

export default useUpdatePurchases;
