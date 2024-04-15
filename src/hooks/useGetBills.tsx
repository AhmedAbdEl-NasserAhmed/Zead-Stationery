import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function useGetBills() {
  try {
    const blogsRef = collection(db, "bills");
    const querySnapShot = await getDocs(blogsRef);
    const bills = [];
    querySnapShot?.forEach((bill) => {
      bills.push({
        id: bill.id,
        ...bill.data(),
      });
    });
    return { data: bills };
  } catch (err) {
    console.error(err.message);
  }
}
