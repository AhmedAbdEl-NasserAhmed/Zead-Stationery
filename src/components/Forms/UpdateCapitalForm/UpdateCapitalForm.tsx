import { useForm } from "react-hook-form";
import styles from "./UpdateCapitalForm.module.scss";

import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import { useUpdateCapitalDataMutation } from "../../../services/capitalApi";
import { useAppDispatch, useAppSelector } from "../../../interfaces/hooks";
import { assingAmount } from "../../../store/slices/currentCapitalSlice";
import { useUpdateCapitalHistoryDataMutation } from "../../../services/capitalHistory";
import Spinner from "../../../ui/Spinner/Spinner";
import { useState } from "react";

interface Props {
  setShowModal?: () => void;
}

function UpdateCapitalForm({ setShowModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });

  const formData = watch();

  const [updateCapital, response] = useUpdateCapitalDataMutation();

  const [updateCapitalHistory] = useUpdateCapitalHistoryDataMutation();

  const [rowId] = useState<string>(crypto.randomUUID().substring(0, 5));

  const { amount } = useAppSelector((state) => state.currentCapital);

  const dispatch = useAppDispatch();

  function onSubmit() {
    updateCapital({
      data: {
        id: "1be3a89a-24eb-45c4-a1b5-deaa703bd465",
        amount: Number(+formData?.[rowId].capital + amount),
      },
    });

    updateCapitalHistory({
      data: {
        id: crypto.randomUUID(),
        capital: Number(+formData?.[rowId].capital),
        date: new Date(Date.now()).toDateString(),
      },
    });

    reset();

    setShowModal();

    dispatch(assingAmount(Number(formData.capital)));
  }

  if (response.isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["capital-form"]}>
      <div className="text-4xl font-semibold uppercase text-purple-600">
        Add Capital
      </div>

      <div>
        <Input
          style={{ width: `${100}%` }}
          defaultValue={0}
          register={{
            ...register(`${rowId}.capital`, {
              required: {
                value: true,
                message: "This field is required",
              },
              min: {
                value: 1,
                message: "You Have to Raise your Capital By at least 1 EGP",
              },
            }),
          }}
          inputError={errors[rowId]?.["capital"]}
          placeholder="💲 Capital"
          type="number"
          name={`${rowId}.capital`}
        />
      </div>
      <div className="flex self-start gap-10">
        <Button disabled={response.isLoading} variation="primary">
          Update
        </Button>
        <Button onClick={setShowModal} variation="secondary">
          cancel
        </Button>
      </div>
    </form>
  );
}

export default UpdateCapitalForm;
