import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

async function useUpdateCapitalHistory({ data }) {
  try {
    await setDoc(doc(db, "capitalHistory", data?.id), {
      ...data,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateCapitalHistory;
