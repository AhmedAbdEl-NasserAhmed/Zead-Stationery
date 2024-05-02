import { useEffect } from "react";
import styles from "./ExistedItemsData.module.scss";

function ExistedItemsData({
  inputData,
  closeMenuFc,
  filtredData,
  selectedItem,
  setValue,
  settersValue,
  onClickItem,
  setBillProductQuantity,
  setShowConditionalItem,
}) {
  const isFilteredData = filtredData?.length >= 1;

  useEffect(() => {
    if (inputData === "") {
      closeMenuFc();
    }
  }, [closeMenuFc, inputData]);

  useEffect(() => {
    if (setBillProductQuantity) {
      setBillProductQuantity();
    }

    if (Object.values(selectedItem)[0] !== "")
      for (const key in settersValue) {
        setValue(key, settersValue[key]);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, selectedItem]);

  if (!isFilteredData) return;

  return (
    <div className={styles["existed-products"]}>
      <ul>
        {filtredData?.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                onClickItem(item, setShowConditionalItem);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExistedItemsData;
