import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  id: string;
  amount: number;
}

async function useUpdateCapital({ id, amount }: Props) {
  const updatedCapital = doc(db, "capital", id);

  try {
    await updateDoc(updatedCapital, {
      amount: amount,
    });
    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateCapital;
