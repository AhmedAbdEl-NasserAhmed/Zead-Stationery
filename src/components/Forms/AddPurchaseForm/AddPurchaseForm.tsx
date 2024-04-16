import { useForm } from "react-hook-form";
import styles from "./AddPurchaseForm.module.scss";

import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import scrollIntoView from "../../../helpers/scrollIntoView";
import { HiCheckCircle, HiOutlineTrash } from "react-icons/hi";
import { useUpdateGoodsDataMutation } from "../../../services/goodsApi";
import { useSetNewPurchasesDataMutation } from "../../../services/purchasesApi";
import Input from "../../../ui/Input/Input";
import { useAppSelector } from "../../../interfaces/hooks";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { formatFormData } from "../../../helpers/formatFormData";
import { purchaseFormInputs } from "../../../constatnts/purchaseFormInputs";
import calculateTotalExpenses from "../../../helpers/calculateTotalExpenses";
import addingClasses from "../../../helpers/addingClasses";
import { ProductObject } from "../../../interfaces/productObject";
import SearchAddPurchaseProdcutsInput from "../../SearchAddPurchaseProdcutsInput/SearchAddPurchaseProdcutsInput";

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
  });

  const [updateGoods, response] = useUpdateGoodsDataMutation();

  // const [updateExistedProduct] = useUseUpdateExistedProductMutation();

  const [setNewPurchases] = useSetNewPurchasesDataMutation();

  const [updateCapital] = useUpdateCapitalDataMutation();

  const [expense, setExpense] = useState<number>(0);

  const [currentBalance, setCurrentBalance] = useState<number>(amount);

  const [currentRowId, setCurrentRowId] = useState<string>();

  console.log("FormData", formData);

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

  // useEffect(() => {
  //   if (!currentRowId) return;

  //   const totalSingleProduct =
  //     +formData?.[currentRowId]?.["product-piecesCount"] *
  //     +formData?.[currentRowId]?.["product-singleCount"];

  //   setValue(
  //     `${currentRowId}.product-totalSingleProductCount`,
  //     totalSingleProduct
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   +formData?.[currentRowId]?.["product-piecesCount"] *
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     +formData?.[currentRowId]?.["product-singleCount"],
  // ]);

  function addNewRow() {
    addingClasses("empty", "not-finished");

    const newFormData = formatFormData(formData);

    for (const item in newFormData) {
      if (newFormData[item] === "" || currentBalance < 0) return;
    }

    setInputRow((data) => [...data, crypto.randomUUID().substring(0, 5)]);
  }

  function onSubmit() {
    if (currentBalance < 0 || !expense) return;

    const serverData = Object.values(formData)
      .filter((item) => typeof item !== "string")
      .map((product) => {
        const modiefiedObject = {
          isRefundable: true,
        };
        for (const key in product) {
          const newKey = key.split("-");
          const parts = newKey[1];
          modiefiedObject[parts] = product[key];
        }

        return {
          id: crypto.randomUUID().substring(0, 5),
          ...modiefiedObject,
        };
      });

    serverData.forEach((product: ProductObject) => {
      updateGoods(product);
      // updateExistedProduct({ productsData: product, id: product.id });
    });

    setNewPurchases({
      id: crypto.randomUUID(),
      products: serverData,
      sellerName: formData.sellerName,
      date: new Date().toDateString(),
    });

    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(currentBalance),
      },
    });

    reset();

    setShowModal();
  }

  function deleteRow(rowID: string) {
    if (inputRow.length === 1) return;
    setInputRow((data) => data.filter((row) => row !== rowID));
  }

  // console.log("FormData", formData);

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
                  formData={formData}
                  errors={errors}
                  register={register}
                  placeholder="Seller Name"
                  type="text"
                  name="sellerName"
                  validtionInputs={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
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
                  <SearchAddPurchaseProdcutsInput
                    clearErrors={clearErrors}
                    disabled={rowIdsArray.includes(rowId)}
                    setRowIdsArray={setRowIdsArray}
                    currentRowId={currentRowId}
                    rowId={rowId}
                    setCurrentRowId={setCurrentRowId}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    formData={formData}
                    name={`${rowId}.product-name`}
                  />

                  {purchaseFormInputs(rowId, rowIdsArray).map((input) => {
                    return (
                      <Input
                        key={input.name}
                        formData={formData}
                        name={input.name}
                        type={input.type}
                        disabled={input.disabled}
                        errors={errors}
                        register={register}
                        placeholder={input.placeholder}
                        validtionInputs={input.validationInputs}
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
