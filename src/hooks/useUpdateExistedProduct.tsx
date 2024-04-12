import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ProductObject } from "../interfaces/productObject";
import getNewUpdateObject from "../helpers/getNewUpdateObject";

async function useUpdateExistedProduct(productsData: ProductObject) {
  const docRef = doc(db, "goods", productsData.name);

  const docSnap = await getDoc(docRef);

  const isAlreadyExisted = docSnap.data();

  const newUpdatedObject = getNewUpdateObject(isAlreadyExisted, productsData);

  if (!isAlreadyExisted) return;

  const updatedObjectRef = doc(db, "goods", isAlreadyExisted?.name);

  try {
    await updateDoc(updatedObjectRef, {
      piecesCount:
        Number(isAlreadyExisted?.piecesCount) +
        Number(newUpdatedObject?.piecesCount),
      piecesPrice: Number(newUpdatedObject?.piecesPrice),
      singleCount: Number(newUpdatedObject?.singleCount),
      singlePrice: Number(newUpdatedObject?.singlePrice),
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

    return { data: "ok" };
  } catch (err) {
    console.error(err.message);
  }
}

export default useUpdateExistedProduct;
