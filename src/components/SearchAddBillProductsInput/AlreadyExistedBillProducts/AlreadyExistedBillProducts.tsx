import { useEffect } from "react";
import styles from "./AlreadyExistedBillProducts.module.scss";
import useClickoutSide from "../../../hooks/useClickoutSide";

function AlreadyExistedBillProducts({
  setShowExistedProducts,
  filtredData,
  setSelectedProduct,
  selectedProduct,
  setValue,
  currentRowId,
  clearErrors,
  setRowIdsArray,
  setSelectedBillProductQuantity,
  setSelectedProducts,
}) {
  const ref = useClickoutSide({
    closeFc: setShowExistedProducts,
    value: false,
  });

  const isFilteredData = filtredData?.length >= 1;

  useEffect(() => {
    if (filtredData.length === 0) {
      setShowExistedProducts(false);
    }
  }, [filtredData.length, setShowExistedProducts]);

  function closeSearchMenu() {
    clearErrors(`${currentRowId}.product-name`);

    setTimeout(() => {
      setShowExistedProducts(false);
      setSelectedProduct({
        name: "",
        type: "",
        singleCount: "",
        piecesCount: "",
        singlePrice: "",
      });
    }, 1);
  }

  function addRowId() {
    setRowIdsArray((data) => [...data, currentRowId]);
  }

  useEffect(() => {
    setSelectedBillProductQuantity(+selectedProduct.totalPiecesCount);

    setValue(`${currentRowId}.product-name`, selectedProduct.name);

    setValue(`${currentRowId}.productId`, selectedProduct.id);

    setValue(`${currentRowId}.soldPieces`, selectedProduct.piecesCount);

    setValue(`${currentRowId}.singleCount`, selectedProduct.singleCount);

    setValue(`${currentRowId}.piecesCount`, selectedProduct.totalPiecesCount);

    setValue(`${currentRowId}.singlePrice`, selectedProduct.singlePrice);
  }, [selectedProduct, setValue, currentRowId, setSelectedBillProductQuantity]);

  return (
    <div className={styles["existed-products"]} ref={ref}>
      {isFilteredData ? (
        <ul>
          {filtredData?.map((product) => {
            return (
              <li
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  closeSearchMenu();
                  addRowId();
                  setSelectedProducts((data) => [...data, product.name]);
                }}
              >
                {product.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full  ">
          <p>No Products to display</p>
        </div>
      )}
    </div>
  );
}

export default AlreadyExistedBillProducts;
