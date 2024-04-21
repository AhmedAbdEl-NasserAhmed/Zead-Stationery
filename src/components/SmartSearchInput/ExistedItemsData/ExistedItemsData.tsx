import { useEffect } from "react";
import styles from "./ExistedItemsData.module.scss";

function ExistedItemsData({
  // closeMenuFc,
  filtredData,
  selectedItem,
  setValue,
  settersValue,
  onClickItem,
  setBillProductQuantity,
}) {
  const isFilteredData = filtredData?.length >= 1;

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

  return (
    <div className={styles["existed-products"]}>
      {isFilteredData ? (
        <ul>
          {filtredData?.map((item) => {
            return (
              <li key={item.id} onClick={() => onClickItem(item)}>
                {item.name}
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

export default ExistedItemsData;
