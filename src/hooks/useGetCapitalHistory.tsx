import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function useGetCapitalHistory() {
  try {
    const blogsRef = collection(db, "capitalHistory");
    const querySnapShot = await getDocs(blogsRef);
    const capitalHistory = [];
    querySnapShot?.forEach((capital) => {
      capitalHistory.push({
        id: capital.id,
        ...capital.data(),
      });
    });
    return { data: capitalHistory };
  } catch (err) {
    console.error(err.message);
  }
}
