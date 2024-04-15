import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";

async function useUpdateGoods(productsData: ProductObject) {
  const docRef = doc(db, "goods", productsData.id);

  const docSnap = await getDoc(docRef);

  try {
    if (!docSnap.data()) {
      await setDoc(doc(db, "goods", productsData.id), {
        ...productsData,
        ["totalPiecesCount"]:
          +productsData.piecesCount * +productsData.singleCount,
        ["pieceProfit"]:
          +productsData.singlePrice * +productsData.singleCount -
          +productsData.piecesPrice,
        ["singlePieceProfit"]: Number(
          (+productsData.singlePrice * +productsData.singleCount -
            +productsData.piecesPrice) /
            +productsData.singleCount
        ).toFixed(2),
        ["profitPercentage"]:
          ((+productsData.singlePrice * +productsData.singleCount -
            +productsData.piecesPrice) *
            +productsData.piecesCount) /
          100,
      });

      return { data: productsData };
    }
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateGoods;
