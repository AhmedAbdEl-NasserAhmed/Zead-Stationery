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
import { useDispatch } from "react-redux";
import { assingAmount } from "../../../store/slices/currentCapitalSlice";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import {
  useGetGoodsDataQuery,
  useUseUpdateExistedProductMutation,
} from "../../../services/goodsApi";
import { useSetNewBillMutation } from "../../../services/billsAPi";
import { formatErrorObject } from "../../../helpers/formatErrorObject";
import { modifyingFormDataBillInputs } from "../../../helpers/modifyingFormDataBillInputs";
import ClearInputsData from "../../ClearInputsData/ClearInputsData";
import SmartSearchInput from "../../SmartSearchInput/SmartSearchInput";

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

  const { data } = useGetGoodsDataQuery("goods");

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

  const [filtredData, setFiltredData] = useState<ProductObject[]>([]);

  const [setNewBill, response] = useSetNewBillMutation();

  const position = {
    top: `${38}px`,
    right: `${8}px`,
  };

  const newFormData = formatFormData(formData, "buyerName");

  const newFormErros = formatErrorObject(errors, "buyerName");

  const inputData = newFormData ? newFormData["product-name"] : undefined;

  console.log("Form Data", formData);

  useEffect(() => {
    setFiltredData(
      data?.filter((product: ProductObject) => {
        if (!selectedProducts.includes(product.name))
          return (
            +product.piecesCount * +product.piecesPrice > 0 &&
            product.name
              .toLocaleLowerCase()
              .includes(String(inputData).toLocaleLowerCase())
          );
      })
    );
  }, [data, inputData, selectedProducts]);

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

  function onSubmit() {
    const serverData = modifyingFormDataBillInputs(formData);

    serverData.forEach((product) => {
      updateExistedProduct({
        invoiceType: "sell",
        productsData: product,
        id: product.id,
      });
    });

    setNewBill({
      id: crypto.randomUUID(),
      products: serverData,
      date: new Date(Date.now()).toDateString(),
      buyerName: formData["buyerName"],
      isRefunded: false,
    });

    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(currentBalance),
      },
    });

    dispatch(assingAmount(currentBalance));

    reset();

    setShowModal();
  }

  function smartSearchInputOnClick(rowId: string, closeFc) {
    setCurrentRowId(rowId);
    closeFc(true);
  }

  function clearInputsDataClick(rowId: string) {
    const productNameReference = formData[rowId]["product-name"];

    setRowIdsArray((data: string[]) => data.filter((id) => id !== rowId));

    setSelectedProducts((data: string[]) =>
      data.filter((productName) => productName !== productNameReference)
    );

    for (const objectkey in formData[rowId]) {
      setValue(`${rowId}${[`.${objectkey}`]}`, "");
    }

    setSelectedBillProductQuantity(0);
  }

  function closeSearchMenu(closeFc) {
    clearErrors(`${currentRowId}.product-name`);

    setTimeout(() => {
      closeFc(false);
      setSelectedBillProduct({
        name: "",
        type: "",
        singleCount: 0,
        piecesCount: 0,
        singlePrice: 0,
      });
    }, 1);
  }

  function addRowId() {
    setRowIdsArray((data) => [...data, currentRowId]);
  }

  // console.log("Form Data", formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["bill-form"]}>
      <div id="formContainer" className={styles["bill-form__container"]}>
        <div className="flex font-semibold justify-between ">
          <h2 className="text-3xl">Add Bill</h2>
          <span
            className="text-3xl cursor-pointer"
            onClick={() => setShowModal()}
          >
            X
          </span>
        </div>

        <hr />

        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-5">
              <h2 className="text-4xl">Buyer Name</h2>
              <Input
                style={{ width: `${100}%` }}
                emptyClass={formData?.["buyerName"] === "" ? "empty" : ""}
                inputError={newFormErros["buyerName"]}
                register={{
                  ...register("buyerName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
                placeholder="Buyer Name"
                type="text"
              />
            </div>
            <h2 className="text-[2.5rem] font-bold text-purple-600">
              {currentBalance} EGP
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-[4rem]">
          {inputRows.map((rowId) => {
            return (
              <div className={styles["bill-form__input-row"]} key={rowId}>
                {
                  <SmartSearchInput
                    filtredData={filtredData}
                    placeholder="Prodcut Name"
                    label="Product Name"
                    name={`${rowId}.product-name`}
                    onClick={(closeFc) =>
                      smartSearchInputOnClick(rowId, closeFc)
                    }
                    emptyClassName={
                      formData?.[rowId]?.["product-name"] === "" ? "empty" : ""
                    }
                    type="text"
                    setValue={setValue}
                    disabledClass={"bg-slate-200"}
                    register={register}
                    disabled={rowIdsArray.includes(rowId)}
                    inputData={inputData}
                    setBillProductQuantity={() =>
                      setSelectedBillProductQuantity(
                        +selectedBillProduct.piecesCount *
                          +selectedBillProduct.singleCount
                      )
                    }
                    onClickItem={(
                      item: {
                        name: string;
                      },
                      closeFc
                    ) => {
                      addRowId();
                      closeSearchMenu(closeFc);
                      setSelectedBillProduct(item);
                      setSelectedProducts((data) => [...data, item.name]);
                    }}
                    newFormErros={newFormErros}
                    settersValue={{
                      [`${currentRowId}.product-name`]:
                        selectedBillProduct.name,

                      [`${currentRowId}.id`]: selectedBillProduct.id,

                      [`${currentRowId}.soldPieces`]:
                        selectedBillProduct.soldPieces,

                      [`${currentRowId}.singleCount`]:
                        selectedBillProduct.singleCount,

                      [`${currentRowId}.piecesCount`]:
                        selectedBillProduct.piecesCount,

                      [`${currentRowId}.singlePrice`]:
                        selectedBillProduct.singlePrice,
                    }}
                    OptionElement={ClearInputsData}
                    optionElementProps={{
                      clearInputsDataClick,
                      rowId,
                      position,
                    }}
                    selectedItem={selectedBillProduct}
                  />
                }

                {billFormInputs(
                  rowId,
                  formData,
                  setSelectedBillProductQuantity,
                  setCurrentRowId
                ).map((input) => {
                  const inputValidationName = input.name.substring(6);

                  return (
                    <Input
                      style={{ width: `${100}%` }}
                      label={input.label}
                      onClick={input.onClick}
                      defaultValue={input.defaultValue}
                      key={input.name}
                      emptyClass={
                        formData?.[rowId]?.[inputValidationName] === ""
                          ? "empty"
                          : ""
                      }
                      type={input.type}
                      disabledClass={input.disabled ? "bg-slate-200" : ""}
                      disabled={input.disabled || response.isLoading}
                      inputError={newFormErros[input.name]}
                      register={{
                        ...register(input.name, input.validationInputs),
                      }}
                      placeholder={input.placeholder}
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
            disabled={response.isLoading}
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
          <Button
            disabled={response.isLoading}
            variation="secondary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddBillForm;
