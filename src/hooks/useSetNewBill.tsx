import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function useSetNewBill(data) {
  try {
    await setDoc(doc(db, "bills", data.id), {
      ...data,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useSetNewBill;
