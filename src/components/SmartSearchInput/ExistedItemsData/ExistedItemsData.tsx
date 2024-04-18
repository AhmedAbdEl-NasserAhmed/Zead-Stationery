import { useEffect } from "react";

import styles from "./ExistedItemsData.module.scss";
import useClickoutSide from "../../../hooks/useClickoutSide";

function ExistedItemsData({
  closeMenuFc,
  filtredData,
  selecteditem,
  setValue,
  settersValue,
  onClickItem,
}) {
  const ref = useClickoutSide({
    closeFc: closeMenuFc,
    value: false,
  });

  const isFilteredData = filtredData?.length >= 1;

  useEffect(() => {
    if (filtredData.length === 0) {
      closeMenuFc(false);
    }
  }, [filtredData.length, closeMenuFc]);

  useEffect(() => {
    for (const key in settersValue) {
      setValue(key, settersValue[key]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, selecteditem]);

  return (
    <div className={styles["existed-products"]} ref={ref}>
      {isFilteredData ? (
        <ul>
          {filtredData?.map((item) => {
            return (
              <li key={item.id} onClick={() => onClickItem(item, closeMenuFc)}>
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
