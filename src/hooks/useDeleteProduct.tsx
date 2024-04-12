import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function useDeleteProduct(id) {
  try {
    await deleteDoc(doc(db, "goods", id));
    return { data: "ok" };
  } catch (err) {
    console.log(err.message);
  }
}

export default useDeleteProduct;
