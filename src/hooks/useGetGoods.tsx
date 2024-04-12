import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function useGetGoods() {
  try {
    const blogsRef = collection(db, "goods");
    const querySnapShot = await getDocs(blogsRef);
    const goods = [];
    querySnapShot?.forEach((good) => {
      goods.push({
        id: good.id,
        ...good.data(),
      });
    });
    return { data: goods };
  } catch (err) {
    console.error(err.message);
  }
}
