import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function useGetCapital() {
  try {
    const blogsRef = collection(db, "capital");
    const querySnapShot = await getDocs(blogsRef);
    const capitals = [];
    querySnapShot?.forEach((capital) => {
      capitals.push({
        id: capital.id,
        ...capital.data(),
      });
    });
    return { data: capitals };
  } catch (err) {
    console.error(err.message);
  }
}


