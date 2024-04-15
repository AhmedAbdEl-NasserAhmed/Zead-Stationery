import { useEffect, useState } from "react";
import styles from "./AddBillForm.module.scss";
import { useForm } from "react-hook-form";
import { ProductObject } from "../../../interfaces/productObject";
import { billFormInputs } from "../../../constatnts/billFormInputs";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import scrollIntoView from "../../../helpers/scrollIntoView";
import { HiCheckCircle, HiOutlineTrash } from "react-icons/hi";
import { useAppSelector } from "../../../interfaces/hooks";
import calculatingTotalProfits from "../../../helpers/calculatingTotalProfits";
import addingClasses from "../../../helpers/addingClasses";
import { formatFormData } from "../../../helpers/formatFormData";
import SearchAddBillProductsInput from "../../SearchAddBillProductsInput/SearchAddBillProductsInput";
import { useDispatch } from "react-redux";
import { assingAmount } from "../../../store/slices/currentCapitalSlice";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { useUseUpdateExistedProductMutation } from "../../../services/goodsApi";

interface Props {
  setShowModal?: () => void;
}

function AddBillForm({ setShowModal }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
    watch,
    clearErrors,
  } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const [updateCapital] = useUpdateCapitalDataMutation();

  const [updateExistedProduct] = useUseUpdateExistedProductMutation();

  const formData = watch();

  const { amount } = useAppSelector((state) => state.currentCapital);

  const [currentRowId, setCurrentRowId] = useState<string>();

  const [inputRows, setInputRows] = useState<string[]>([
    crypto.randomUUID().substring(0, 5),
  ]);

  const [rowIdsArray, setRowIdsArray] = useState<string[]>([]);

  const [currentBalance, setCurrentBalance] = useState<number>(amount);

  const [profits, setProfits] = useState<number>(0);

  const [selectedBillProduct, setSelectedBillProduct] = useState<ProductObject>(
    {
      name: "",
      type: "",
      singleCount: 0,
      piecesCount: 0,
      singlePrice: 0,
    }
  );

  const [selectedBillProductQuantity, setSelectedBillProductQuantity] =
    useState<number>();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    setCurrentRowId(inputRows[inputRows.length - 1]);
  }, [inputRows]);

  useEffect(() => {
    const totalProfits = calculatingTotalProfits(formData);

    setProfits(totalProfits);
    //
  }, [formData, currentRowId]);

  useEffect(() => {
    setCurrentBalance(amount + profits);
  }, [amount, profits]);

  useEffect(() => {
    const isValid = currentRowId && selectedBillProductQuantity > 0;

    if (isValid) {
      const totalPrice =
        +formData?.[currentRowId]?.["singlePrice"] *
        +formData?.[currentRowId]?.["quantity"];

      setValue(`${currentRowId}.totalPrice`, totalPrice);

      const totalQuantity =
        selectedBillProductQuantity - +formData?.[currentRowId]?.["quantity"];

      setValue(`${currentRowId}.piecesCount`, totalQuantity);

      // const remainingPiecesCounts=

      const piecesDecrement = Math.floor(
        +formData?.[currentRowId]?.["quantity"] /
          +formData?.[currentRowId]?.["singleCount"]
      );

      setValue(`${currentRowId}.soldPieces`, piecesDecrement);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentRowId,
    selectedBillProductQuantity,
    setValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formData?.[currentRowId]?.["singlePrice"],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formData?.[currentRowId]?.["quantity"],
  ]);

  function addNewRow() {
    addingClasses("empty", "not-finished");

    const newFormData = formatFormData(formData);

    for (const item in newFormData) {
      if (
        newFormData[item] === "" ||
        currentBalance < 0 ||
        !!errors?.[currentRowId]
      )
        return;
    }

    setInputRows((data) => [...data, crypto.randomUUID().substring(0, 5)]);

    setSelectedBillProductQuantity(0);
  }

  function deleteRow(rowID: string) {
    if (inputRows.length === 1) return;

    setInputRows((data) => data.filter((row) => row !== rowID));

    const productNameReference = formData[currentRowId]["product-name"];

    setSelectedProducts((data: string[]) =>
      data.filter((productName) => productName !== productNameReference)
    );

    setSelectedBillProductQuantity(0);
  }

  console.log("FormData", formData);

  function onSubmit() {
    const serverData = Object.entries(formData).map((item) => {
      const modiefiedObject = {
        productId: "",
      };

      for (const key in item[1]) {
        const newKey = key.split("-");
        const referenceKey = newKey[1];
        if (key.includes("-")) {
          modiefiedObject[referenceKey] = item[1][key];
        } else {
          modiefiedObject[key] = item[1][key];
        }
      }

      return modiefiedObject;
    });

    serverData.forEach((product) => {
      updateExistedProduct({
        productsData: product,
        id: product.productId,
      });
    });

    dispatch(assingAmount(currentBalance));

    reset();

    setShowModal();

    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(currentBalance),
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["bill-form"]}>
      <div id="formContainer" className={styles["bill-form__container"]}>
        <div className="flex justify-between items-center">
          <h2 className="text-[2.2rem] font-semibold">Add A Bill</h2>
          <h2 className="text-[2.2rem] font-semibold text-purple-500">
            {currentBalance} EGP
          </h2>
        </div>
        <div className="flex flex-col gap-[4rem]">
          {inputRows.map((rowId) => {
            return (
              <div className={styles["bill-form__input-row"]} key={rowId}>
                <SearchAddBillProductsInput
                  label="Product Name"
                  setSelectedBillProductQuantity={
                    setSelectedBillProductQuantity
                  }
                  setSelectedProducts={setSelectedProducts}
                  selectedProducts={selectedProducts}
                  clearErrors={clearErrors}
                  disabled={rowIdsArray.includes(rowId)}
                  rowId={rowId}
                  setValue={setValue}
                  errors={errors}
                  register={register}
                  formData={formData}
                  name={`${rowId}.product-name`}
                  setRowIdsArray={setRowIdsArray}
                  selectedProduct={selectedBillProduct}
                  setSelectedProduct={setSelectedBillProduct}
                  currentRowId={currentRowId}
                  setCurrentRowId={setCurrentRowId}
                />

                {billFormInputs(
                  rowId,
                  formData,
                  setSelectedBillProductQuantity,
                  setCurrentRowId
                ).map((input) => {
                  return (
                    <Input
                      label={input.label}
                      onClick={input.onClick}
                      defaultValue={input.defaultValue}
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
                {rowId !== inputRows[0] ? (
                  <span
                    className={styles["bill-form__input-row--delete"]}
                    onClick={() => {
                      deleteRow(rowId);
                    }}
                  >
                    <HiOutlineTrash />
                  </span>
                ) : (
                  <span className={styles["bill-form__input-row--verify"]}>
                    <HiCheckCircle />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles["bill-form__buttons"]}>
          <Button
            variation="primary"
            type="button"
            onClick={() => {
              addNewRow();

              scrollIntoView("formContainer");

              setSelectedBillProduct({
                name: "",
                type: "",
                singleCount: 0,
                piecesCount: 0,
                singlePrice: 0,
              });
            }}
          >
            Add new product
          </Button>
          <Button variation="secondary" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddBillForm;
