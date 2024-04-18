import { ProductObject } from "../../../interfaces/productObject";
import styles from "./RefundBillInvoice.module.scss";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import { refundBillInvoiceInputs } from "../../../constatnts/refundBillInvoiceInputs";
import { useForm } from "react-hook-form";
import { formatFormData } from "../../../helpers/formatFormData";
import { formatErrorObject } from "../../../helpers/formatErrorObject";
import { InvoiceDataObject } from "../../../interfaces/invoiceDataObject";

interface Props {
  setShowModal?: () => void;
  optionElementProps: InvoiceDataObject;
}

function RefundBillInvoice({ optionElementProps, setShowModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formData = watch();

  console.log("optionElementProps", optionElementProps);

  const newFormData = formatFormData(formData, "");

  const newFormErros = formatErrorObject(errors, "");

  function onSubmit() {
    console.log("Hello");
  }

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
