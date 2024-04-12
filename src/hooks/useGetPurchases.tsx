import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function useGetPurchases() {
  try {
    const blogsRef = collection(db, "purchases");
    const querySnapShot = await getDocs(blogsRef);
    const purchases = [];
    querySnapShot?.forEach((good) => {
      purchases.push({
        id: good.id,
        ...good.data(),
      });
    });
    return { data: purchases };
  } catch (err) {
    console.error(err.message);
  }
}
