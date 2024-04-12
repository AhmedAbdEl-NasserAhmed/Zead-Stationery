import { useState } from "react";
import styles from "./SearchAddPurchaseProdcutsInput.module.scss";
import { useGetGoodsDataQuery } from "../../services/goodsApi";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { ProductObject } from "../../interfaces/productObject";
import { formatFormData } from "../../helpers/formatFormData";
import { formatErrorObject } from "../../helpers/formatErrorObject";

import { UseFormRegister, FieldValues } from "react-hook-form";
import AlreadyExistedPurchaseProducts from "./AlreadyExistedPurchaseProducts/AlreadyExistedPurchaseProducts";

interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  formData: object;
  errors: object;
  selectedProduct: ProductObject;
  currentRowId: string;
  disabled: boolean;
  rowId: string;
  setValue: (name: string, value: unknown) => void;
  clearErrors: () => void;
  setSelectedProduct: (object: ProductObject) => void;
  setCurrentRowId: (string: string) => void;
  setRowIdsArray: (data) => void;
}

function SearchAddPurchaseProdcutsInput({
  name,
  register,
  formData,
  errors,
  setValue,
  clearErrors,
  setSelectedProduct,
  selectedProduct,
  currentRowId,
  disabled,
  setCurrentRowId,
  setRowIdsArray,
  rowId,
}: Props) {
  const [showExistedProducts, setShowExistedProducts] =
    useState<boolean>(false);

  const { data } = useGetGoodsDataQuery("goods");

  const inputData =
    formData && formData[currentRowId]
      ? formData[currentRowId]["product-name"]
      : undefined;

  const filtredData = data?.filter((product: ProductObject) =>
    product.name
      .toLocaleLowerCase()
      .includes(String(inputData).toLocaleLowerCase())
  );

  const newFormData = formatFormData(formData);

  const newFormErros = formatErrorObject(errors);

  return (
    <div className="flex flex-col relative items-center justify-center self-start ">
      <div className="relative">
        <input
          disabled={disabled}
          name={name}
          placeholder="Prodcut Name"
          className={`${styles["search-input"]} 
          ${disabled ? "bg-slate-200" : ""}
        
          ${newFormData[name] === "" ? "empty" : ""}
          `}
          onClick={() => {
            setCurrentRowId(rowId);
            setShowExistedProducts(true);
          }}
          {...register(name, {
            required: {
              value: true,
              message: "This fiels is required",
            },
          })}
        />
        {disabled && (
          <span
            onClick={() => {
              setRowIdsArray((data: string[]) =>
                data.filter((id) => id !== rowId)
              );

              for (const objectkey in formData[rowId]) {
                setValue(`${rowId}${[`.${objectkey}`]}`, "");
              }
            }}
            className={styles["searchProduct-close"]}
          >
            X
          </span>
        )}
        {newFormErros[name] && (
          <ErrorMessage>{newFormErros[name]?.message}</ErrorMessage>
        )}
      </div>
      {showExistedProducts && inputData !== undefined && (
        <AlreadyExistedPurchaseProducts
          clearErrors={clearErrors}
          setRowIdsArray={setRowIdsArray}
          currentRowId={currentRowId}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setValue={setValue}
          filtredData={filtredData}
          setShowExistedProducts={setShowExistedProducts}
        />
      )}
    </div>
  );
}

export default SearchAddPurchaseProdcutsInput;
