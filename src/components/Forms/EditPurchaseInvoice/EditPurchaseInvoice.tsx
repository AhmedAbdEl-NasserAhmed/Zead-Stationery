import { updatePurchaseInputs } from "../../../constatnts/updataPurchaseInputs";
import styles from "./EditPurchaseInvoice.module.scss";
import Input from "../../../ui/Input/Input";
import { ProductObject } from "../../../interfaces/productObject";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button/Button";
import { useUseUpdateExistedProductMutation } from "../../../services/goodsApi";
import { useUpdatePurchasesDataMutation } from "../../../services/purchasesApi";
import { useAppSelector } from "../../../interfaces/hooks";
import { useEffect, useRef, useState } from "react";
import calculateTotalExpenses from "../../../helpers/calculateTotalExpenses";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";

interface Props {
  setShowModal?: () => void;
  optionElementProps: InvoiceDataObject;
}

function EditPurchaseInvoice({ optionElementProps, setShowModal }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  console.log("FormData", formData);

  const [updateExistedProduct, response] = useUseUpdateExistedProductMutation();

  const [updatePurchases] = useUpdatePurchasesDataMutation();

  const [updateCapital] = useUpdateCapitalDataMutation();

  const { amount } = useAppSelector((state) => state.currentCapital);

  const [currentBalance] = useState<number>(amount);

  const [expense, setExpense] = useState<number>(0);

  const isMount = useRef<boolean>(false);

  const totalPrice = optionElementProps?.products.reduce(
    (acc, product) => acc + product.piecesCount * product.piecesPrice,
    0
  );

  const isFormData = Object.keys(formData).length;

  const [preveTotalPrice, setTotalPrevPrice] = useState<number>(
    amount + totalPrice
  );

  useEffect(() => {
    if (isMount.current) {
      const totalExpenses = calculateTotalExpenses(
        formData,
        amount,
        setTotalPrevPrice
      );

      setExpense(totalExpenses);
    } else {
      isMount.current = true;
    }
  }, [formData, amount]);

  useEffect(() => {
    setTotalPrevPrice(amount + totalPrice - expense);
  }, [expense, amount, totalPrice]);

  function onSubmit() {
    if (preveTotalPrice < 0 || !expense) return;

    const serverData = Object.entries(formData).map((item) => {
      const modiefiedObject = {
        id: item[0],
      };

      for (const key in item[1]) {
        const newKey = key.split("-");
        const referenceKey = newKey[1];
        modiefiedObject[referenceKey] = item[1][key];
      }

      return modiefiedObject;
    });

    serverData.forEach((product: ProductObject) => {
      updateExistedProduct({ productsData: product, id: product.id });
    });

    updatePurchases({
      id: optionElementProps.id,
      products: serverData,
      date: new Date().toDateString(),
    });

    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(isFormData > 0 ? preveTotalPrice : currentBalance),
      },
    });

    setShowModal();

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["edit-purchase"]}>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl  font-semibold">Update Purchase Invocie</h2>
        <h2 className="text-3xl font-semibold text-purple-600">
          {isFormData > 0 ? preveTotalPrice : currentBalance} EGP
        </h2>
      </div>

      <div className={styles["edit-purchase__row-input"]}>
        {optionElementProps?.products?.map((product: ProductObject) => {
          console.log("product", product);
          return (
            <div key={product.id} className="flex gap-10 ">
              {updatePurchaseInputs(product, product.id).map((input) => {
                return (
                  <Input
                    label={input.label}
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
            </div>
          );
        })}
      </div>

      <div className={styles["edit-purchase__buttons"]}>
        <Button disabled={response.isLoading} variation="primary" type="submit">
          Edit
        </Button>
        <Button
          onClick={setShowModal}
          disabled={response.isLoading}
          variation="secondary"
          type="button"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EditPurchaseInvoice;
