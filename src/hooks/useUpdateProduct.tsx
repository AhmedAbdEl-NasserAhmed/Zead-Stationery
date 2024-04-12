import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";

interface Props {
  product: ProductObject;
  data: {
    piecesCount: number;
    piecesPrice: number;
    singleCount: number;
    singlePrice: number;
    pieceProfit: number;
  };
}

async function useUpdateProduct({ data, product }: Props) {
  const updatedObjectRef = doc(db, "goods", product.name);

  try {
    await updateDoc(updatedObjectRef, {
      ...data,
    });

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateProduct;
