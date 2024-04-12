import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  data: { id: string; amount: number };
}

async function useUpdateCapital({ data }: Props) {
  const updatedCapital = doc(db, "capital", data.id);

  console.log("data", data);

  try {
    await updateDoc(updatedCapital, {
      ...data,
    });
    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateCapital;
