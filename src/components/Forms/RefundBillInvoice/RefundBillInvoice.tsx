import { ProductObject } from "../../../interfaces/productObject";
import styles from "./RefundBillInvoice.module.scss";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import { refundBillInvoiceInputs } from "../../../constatnts/refundBillInvoiceInputs";
import { useForm } from "react-hook-form";
import { formatFormData } from "../../../helpers/formatFormData";
import { formatErrorObject } from "../../../helpers/formatErrorObject";
import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { useUseUpdateExistedProductMutation } from "../../../services/goodsApi";
import { useAppSelector } from "../../../interfaces/hooks";
import { useUpdateBillInvoiceMutation } from "../../../services/billsAPi";

interface Props {
  setShowModal?: () => void;
  optionElementProps: InvoiceDataObject;
}

function RefundBillInvoice({ optionElementProps, setShowModal }: Props) {
  const [updateCapital] = useUpdateCapitalDataMutation();

  const [updateExistedProduct] = useUseUpdateExistedProductMutation();

  const [updateBillInvoice] = useUpdateBillInvoiceMutation();

  // const [updateBillInvoice]=useU

  const { amount } = useAppSelector((state) => state.currentCapital);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const newFormData = formatFormData(formData, "");

  const newFormErros = formatErrorObject(errors, "");

  const totalPrice = optionElementProps.products
    .slice()
    .map((product) => product.totalPrice);

  const currentBalanceUpdate = totalPrice.reduce(
    (acc: number, number: number) => {
      return acc + number + 0;
    }
  );

  function onSubmit() {
    optionElementProps.products.forEach((product) => {
      updateExistedProduct({
        invoiceType: "refund",
        productsData: product,
        id: product.id,
      });
    });

    updateBillInvoice({
      data: {
        id: optionElementProps.id,
        isRefunded: true,
      },
    });

    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(amount - currentBalanceUpdate),
      },
    });

    setShowModal();
  }

  // console.log("optionElementProps", optionElementProps);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["refund-bill"]}>
      <h2 className="text-3xl  font-semibold">Refund Bill Invocie</h2>

      <div className={styles["refund-bill__row-input"]}>
        {optionElementProps?.products?.map((product: ProductObject) => {
          return (
            <div key={product.id} className="flex justify-evenly gap-10  ">
              {refundBillInvoiceInputs(product).map((input) => {
                return (
                  <Input
                    style={{ width: `${100}%` }}
                    key={input.id}
                    label={input.label}
                    defaultValue={input.defaultValue}
                    newFormData={newFormData}
                    disabledClass={input.disabled ? "bg-slate-200" : ""}
                    type={input.type}
                    disabled={input.disabled}
                    inputError={newFormErros[input.name]}
                    register={{
                      ...register(input.name),
                    }}
                    placeholder={input.placeholder}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className={styles["refund-bill__buttons"]}>
        <Button variation="primary" type="submit">
          Refund
        </Button>
        <Button onClick={setShowModal} variation="secondary" type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default RefundBillInvoice;
