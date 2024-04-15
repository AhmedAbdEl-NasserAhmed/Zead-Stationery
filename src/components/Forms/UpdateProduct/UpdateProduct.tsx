import { ProductObject } from "../../../interfaces/productObject";
import styles from "./UpdateProduct.module.scss";
import Input from "../../../ui/Input/Input";
import { useForm } from "react-hook-form";
import Button from "../../../ui/Button/Button";
import Spinner from "../../../ui/Spinner/Spinner";
import { updateFormInputs } from "../../../constatnts/updateFormInputs";
import { useEffect, useRef, useState } from "react";
import updateProductFormatData from "../../../helpers/updateProductFormatData";
import { useAppDispatch, useAppSelector } from "../../../interfaces/hooks";
import { assingAmount } from "../../../store/slices/currentCapitalSlice";
import { updateProductTableContent } from "../../../constatnts/updateProductTableContent";
import Table from "../../../ui/Table/Table";
import { useUseUpdateExistedProductMutation } from "../../../services/goodsApi";

interface Props {
  product: ProductObject;
  setShowModal?: () => void;
}

function UpdateProduct({ product, setShowModal }: Props) {
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const newFormData = updateProductFormatData(formData);

  const [updateExistedProduct, response] = useUseUpdateExistedProductMutation();

  const { amount } = useAppSelector((state) => state.currentCapital);

  const dispatch = useAppDispatch();

  const [expense, setExpense] = useState<number>(0);

  const [currentBalance, setCurrentBalance] = useState<number>(amount);

  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current)
      setExpense(
        +newFormData["product-piecesCount"] *
          +newFormData["product-piecesPrice"]
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-piecesCount"],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-piecesPrice"],
    amount,
    expense,
  ]);

  useEffect(() => {
    setCurrentBalance(amount - expense);
  }, [amount, expense]);

  function onSubmit() {
    if (currentBalance < 0) return;

    const serverData = Object.entries(formData).map((item) => {
      const modiefiedObject = {
        id: item[0],
        name: product.name,
      };

      for (const key in item[1]) {
        const newKey = key.split("-");
        const referenceKey = newKey[1];
        modiefiedObject[referenceKey] = item[1][key];
      }

      return modiefiedObject;
    });

    console.log("serverData", serverData);

    serverData.forEach((itemProduct) => {
      updateExistedProduct({
        productsData: itemProduct,
        id: product.id,
      });
    });

    setShowModal();

    dispatch(assingAmount(currentBalance));
  }

  useEffect(() => {
    if (isMounted.current) {
      const pieceProfit =
        +newFormData["product-singleCount"] *
          +newFormData["product-singlePrice"] -
        +newFormData["product-piecesPrice"];

      setValue(`${product.id}.product-pieceProfit`, pieceProfit);

      const singlePieceProfit = Number(
        (+newFormData["product-singlePrice"] *
          +newFormData["product-singleCount"] -
          +newFormData["product-piecesPrice"]) /
          +newFormData["product-singleCount"]
      ).toFixed(2);

      setValue(`${product.id}.product-singlePieceProfit`, singlePieceProfit);

      const profitPercentage =
        ((+newFormData["product-singlePrice"] *
          +newFormData["product-singleCount"] -
          +newFormData["product-piecesPrice"]) *
          +newFormData["product-piecesCount"]) /
        100;

      setValue(`${product.id}.product-profitPercentage`, profitPercentage);
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    product.id,
    setValue,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-singleCount"],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-singlePrice"],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-piecesPrice"],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newFormData["product-piecesCount"],
  ]);

  if (response.isLoading) return <Spinner />;

  console.log("FORM DATA", formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["update-form"]}>
      <h2 className="text-4xl uppercase font-semibold">
        Update <span className=" text-purple-700">{product.name}</span> Details
      </h2>

      <Table
        title={"Existed Data"}
        data={[product]}
        headers={updateProductTableContent}
      />

      <div className="flex flex-col gap-[2rem]">
        <div className="flex justify-between items-center ">
          <h2 className="text-4xl">Update Product Details</h2>
          <h2 className="text-3xl text-purple-600 font-bold">
            {currentBalance} EGP
          </h2>
        </div>
        <div className={styles["update-form__input-row"]}>
          {updateFormInputs(product.id, product).map((input) => {
            return (
              <Input
                key={input.name}
                defaultValue={input.defaultValue}
                formData={formData}
                errors={errors}
                disabled={input.disabled}
                register={register}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                validtionInputs={input.validationInputs}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-start gap-10">
        <Button disabled={response.isLoading} variation="primary">
          Update
        </Button>
        <Button
          disabled={response.isLoading}
          onClick={setShowModal}
          variation="secondary"
        >
          cancel
        </Button>
      </div>
    </form>
  );
}

export default UpdateProduct;
