import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PurchaseInvoice } from "../interfaces/purchaseInvoice";

async function useSetNewPurchase(data: PurchaseInvoice) {
  try {
    await setDoc(doc(db, "purchases", data.id), {
      ...data,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useSetNewPurchase;
