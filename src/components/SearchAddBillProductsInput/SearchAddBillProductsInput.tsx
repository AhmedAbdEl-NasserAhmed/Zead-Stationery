import { useState } from "react";
import styles from "./SearchAddBillProductsInput.module.scss";
import { useGetGoodsDataQuery } from "../../services/goodsApi";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { ProductObject } from "../../interfaces/productObject";
import { formatFormData } from "../../helpers/formatFormData";
import { formatErrorObject } from "../../helpers/formatErrorObject";

import { UseFormRegister, FieldValues } from "react-hook-form";
import AlreadyExistedBillProducts from "./AlreadyExistedBillProducts/AlreadyExistedBillProducts";

interface Props {
  name: string;
  register: UseFormRegister<FieldValues>;
  formData: object;
  errors: object;
  selectedProduct: ProductObject;
  currentRowId: string;
  disabled: boolean;
  rowId: string;
  setSelectedProducts: (data) => void;
  setSelectedBillProductQuantity: (number: number) => void;
  setValue: (name: string, value: unknown) => void;
  clearErrors: () => void;
  setSelectedProduct: (object: ProductObject) => void;
  setCurrentRowId: (string: string) => void;
  setRowIdsArray: (data) => void;
  selectedProducts: string[];
}

function SearchAddBillProductsInput({
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
  setSelectedBillProductQuantity,
  setSelectedProducts,
  selectedProducts,
}: Props) {
  const [showExistedProducts, setShowExistedProducts] =
    useState<boolean>(false);

  const { data } = useGetGoodsDataQuery("goods");

  const inputData =
    formData && formData[currentRowId]
      ? formData[currentRowId]["product-name"]
      : undefined;

  const filtredData = data?.filter((product: ProductObject) => {
    if (!selectedProducts.includes(product.name))
      return product.name
        .toLocaleLowerCase()
        .includes(String(inputData).toLocaleLowerCase());
  });

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
              const productNameReference = formData[rowId]["product-name"];

              setRowIdsArray((data: string[]) =>
                data.filter((id) => id !== rowId)
              );

              setSelectedProducts((data: string[]) =>
                data.filter(
                  (productName) => productName !== productNameReference
                )
              );

              for (const objectkey in formData[rowId]) {
                setValue(`${rowId}${[`.${objectkey}`]}`, "");
              }

              setSelectedBillProductQuantity(0);
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
        <AlreadyExistedBillProducts
          setSelectedProducts={setSelectedProducts}
          setSelectedBillProductQuantity={setSelectedBillProductQuantity}
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

export default SearchAddBillProductsInput;
