import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PurchaseInvoice } from "../interfaces/purchaseInvoice";

async function useUpdatePurchases(data: PurchaseInvoice) {
  const purchaseInvoiceRef = doc(db, "purchases", data.id);
  try {
    await updateDoc(purchaseInvoiceRef, {
      products: data.products,
    });
    return { data };
  } catch (err) {
    console.error(err);
  }
}

export default useUpdatePurchases;
