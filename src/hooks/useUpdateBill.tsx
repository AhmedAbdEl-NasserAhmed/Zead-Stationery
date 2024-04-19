import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  data: { id: string; isRefunded: boolean };
}

async function useUpdateBillInvoice({ data }: Props) {
  const updatedBillInoice = doc(db, "bills", data.id);

  try {
    await updateDoc(updatedBillInoice, {
      ...data,
    });
    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateBillInvoice;
