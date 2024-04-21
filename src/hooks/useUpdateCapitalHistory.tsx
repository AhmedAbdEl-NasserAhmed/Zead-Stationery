import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  id: string;
  capital: number;
  date: string;
}

async function useUpdateCapitalHistory({ id, capital, date }: Props) {
  try {
    await setDoc(doc(db, "capitalHistory", id), {
      id,
      capital,
      date,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateCapitalHistory;
