import { useForm } from "react-hook-form";
import styles from "./AddPurchaseForm.module.scss";

import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import scrollIntoView from "../../../helpers/scrollIntoView";
import { HiCheckCircle, HiOutlineTrash } from "react-icons/hi";
import {
  useGetGoodsDataQuery,
  useUpdateGoodsDataMutation,
  useUseUpdateExistedProductMutation,
} from "../../../services/goodsApi";
import { useSetNewPurchasesDataMutation } from "../../../services/purchasesApi";
import Input from "../../../ui/Input/Input";
import { useAppSelector } from "../../../interfaces/hooks";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { formatFormData } from "../../../helpers/formatFormData";
import { purchaseFormInputs } from "../../../constatnts/purchaseFormInputs";
import calculateTotalExpenses from "../../../helpers/calculateTotalExpenses";
import addingClasses from "../../../helpers/addingClasses";
import { ProductObject } from "../../../interfaces/productObject";
import { formatErrorObject } from "../../../helpers/formatErrorObject";
import ClearInputsData from "../../ClearInputsData/ClearInputsData";
import SmartSearchInput from "../../SmartSearchInput/SmartSearchInput";

interface Props {
  setShowModal?: () => void;
}

function AddPurchaseForm({ setShowModal }: Props) {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  });

  const formData = watch();

  const { amount } = useAppSelector((state) => state.currentCapital);

  const [inputRow, setInputRow] = useState([
    crypto.randomUUID().substring(0, 5),
  ]);

  const [rowIdsArray, setRowIdsArray] = useState<string[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<ProductObject>({
    name: "",
    type: "",
    id: "",
  });

  const [currentRowId, setCurrentRowId] = useState<string>();

  const [updateGoods, response] = useUpdateGoodsDataMutation();

  const [updateExistedProduct] = useUseUpdateExistedProductMutation();

  const { data } = useGetGoodsDataQuery("goods");

  const [setNewPurchases] = useSetNewPurchasesDataMutation();

  const [updateCapital] = useUpdateCapitalDataMutation();

  const [expense, setExpense] = useState<number>(0);

  const position = {
    top: `${15}px`,
    right: `${10}px`,
  };

  const [currentBalance, setCurrentBalance] = useState<number>(amount);

  const [filtredData, setFiltredData] = useState<ProductObject[]>([]);

  const newFormData = formatFormData(formData, "sellerName");

  const newFormErros = formatErrorObject(errors, "sellerName");

  const inputData = formData
    ? formData?.[currentRowId]?.["product-name"]
    : undefined;

  // console.log("Form Data", formData);

  useEffect(() => {
    setCurrentRowId(inputRow[inputRow.length - 1]);
  }, [inputRow]);

  useEffect(() => {
    const totalExpenses = calculateTotalExpenses(
      formData,
      amount,
      setCurrentBalance
    );

    setExpense(totalExpenses);
  }, [formData, amount]);

  useEffect(() => {
    setCurrentBalance(amount - expense);
  }, [amount, expense]);

  useEffect(() => {
    setFiltredData(
      data?.filter((product: ProductObject) =>
        product?.name
          .toLocaleLowerCase()
          .includes(String(inputData).toLocaleLowerCase())
      )
    );
  }, [data, inputData]);

  function addNewRow() {
    addingClasses("empty", "not-finished");

    for (const item in newFormData) {
      if (item !== "product-existedProductId") {
        if (newFormData[item] === "" || currentBalance < 0) return;
      }
    }

    setInputRow((data) => [...data, crypto.randomUUID().substring(0, 5)]);
  }

  function onSubmit() {
    if (currentBalance < 0 || !expense) return;

    const serverData = Object.values(formData)
      .filter((item) => typeof item !== "string")
      .map((product) => {
        const modiefiedObject = {};

        for (const key in product) {
          if (product[key]) {
            const newKey = key.split("-");
            const parts = newKey[1];
            modiefiedObject[parts] = product[key];
          }
        }

        const idConditions = product["product-existedProductId"]
          ? product["product-existedProductId"]
          : crypto.randomUUID().substring(0, 5);

        return {
          id: idConditions,
          ...modiefiedObject,
        };
      });

    serverData.forEach((product: ProductObject) => {
      updateGoods(product);
      updateExistedProduct({
        invoiceType: "update",
        productsData: product,
        id: product.id,
      });
    });

    setNewPurchases({
      id: crypto.randomUUID(),
      products: serverData,
      sellerName: formData.sellerName,
      date: new Date().toDateString(),
    });

    updateCapital({
      id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
      amount: Number(currentBalance),
    });

    reset();

    setShowModal();
  }

  function deleteRow(rowID: string) {
    if (inputRow.length === 1) return;
    setInputRow((data) => data.filter((row) => row !== rowID));
  }

  function smartSearchInputOnClick(rowId: string) {
    setCurrentRowId(rowId);
  }

  function clearInputsDataClick(rowId: string) {
    setRowIdsArray((data: string[]) => data.filter((id) => id !== rowId));

    for (const key in formData[currentRowId]) {
      setValue(`${rowId}${[`.${key}`]}`, "");
    }
  }

  function closeSearchListMenu(closeFc) {
    clearErrors(`${currentRowId}.product-type`);
    clearErrors(`${currentRowId}.product-name`);

    setTimeout(() => {
      setSelectedProduct({ name: "", type: "" });
      closeFc(false);
    }, 1);
  }

  function addRowId() {
    setRowIdsArray((data) => [...data, currentRowId]);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["purchase-form"]}>
      <div id="formContainer" className={styles["purchase-form__container"]}>
        <div className="flex font-semibold justify-between py-4">
          <h2 className="text-3xl">Add Purchase Bill</h2>
          <span
            className="text-3xl cursor-pointer"
            onClick={() => setShowModal()}
          >
            X
          </span>
        </div>

        <hr />

        <div className={styles["inputRow-container"]}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div className="flex flex-col gap-5">
                <h2 className="text-4xl">Seller Name</h2>
                <Input
                  disabled={response.isLoading}
                  style={{ width: `${100}%` }}
                  newFormData={newFormData}
                  emptyClass={formData?.["sellerName"] === "" ? "empty" : ""}
                  inputError={newFormErros["sellerName"]}
                  register={{
                    ...register("sellerName", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }),
                  }}
                  placeholder="Seller Name"
                  type="text"
                />
              </div>
              <h2 className="text-[2.5rem] font-bold text-purple-600">
                {currentBalance} EGP
              </h2>
            </div>
          </div>
          <div id="rows-container" className="flex flex-col gap-[3.2rem]">
            <h2 className="text-4xl">Purchase Bill Details</h2>

            {inputRow.map((rowId) => {
              return (
                <div key={rowId} className={styles["purchase-form__input-row"]}>
                  <SmartSearchInput
                    inputData={inputData}
                    label=""
                    filtredData={filtredData}
                    name={`${rowId}.product-name`}
                    type="text"
                    emptyClassName={
                      formData?.[rowId]?.["product-name"] === "" ? "empty" : ""
                    }
                    emptyStringCondition={inputData !== ""}
                    onClick={() => smartSearchInputOnClick(rowId)}
                    onClickItem={(item, closeFc) => {
                      addRowId();
                      closeSearchListMenu(closeFc);
                      setSelectedProduct(item);
                    }}
                    selectedItem={selectedProduct}
                    settersValue={{
                      [`${currentRowId}.product-name`]: selectedProduct.name,
                      [`${currentRowId}.product-type`]: selectedProduct.type,
                      [`${currentRowId}.product-existedProductId`]:
                        selectedProduct.id,
                    }}
                    OptionElement={ClearInputsData}
                    optionElementProps={{
                      clearInputsDataClick,
                      position,
                      rowId,
                    }}
                    setValue={setValue}
                    newFormErros={newFormErros}
                    register={register}
                    placeholder="Prodcut Name"
                    disabled={rowIdsArray.includes(rowId)}
                    disabledClass={"bg-slate-200"}
                  />

                  {purchaseFormInputs(rowId, rowIdsArray).map((input) => {
                    const inputValidationName = input.name.substring(6);

                    return (
                      <Input
                        key={input.name}
                        style={{ width: `${100}%` }}
                        emptyClass={
                          formData?.[rowId]?.[inputValidationName] === ""
                            ? "empty"
                            : ""
                        }
                        type={input.type}
                        disabled={input.disabled || response.isLoading}
                        disabledClass={input.disabled ? "bg-slate-200" : ""}
                        register={{
                          ...register(input.name, input.validationInputs),
                        }}
                        inputError={newFormErros[input.name]}
                        placeholder={input.placeholder}
                      />
                    );
                  })}

                  {rowId !== inputRow[0] ? (
                    <span
                      className={styles["purchase-form__input-row--delete"]}
                      onClick={() => {
                        deleteRow(rowId);
                      }}
                    >
                      <HiOutlineTrash />
                    </span>
                  ) : (
                    <span
                      className={styles["purchase-form__input-row--verify"]}
                    >
                      <HiCheckCircle />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["purchase-form__buttons"]}>
          <Button
            disabled={response.isLoading}
            variation="secondary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            disabled={response.isLoading || currentBalance === 0}
            variation="primary"
            type="button"
            onClick={() => {
              if (amount < 0) return;

              addNewRow();

              scrollIntoView("formContainer");

              setSelectedProduct({
                name: "",
                type: "",
              });
            }}
          >
            Add new product
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddPurchaseForm;
