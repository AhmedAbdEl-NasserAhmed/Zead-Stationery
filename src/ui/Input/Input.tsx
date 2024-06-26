import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  name?: string;
  register?: UseFormRegisterReturn;
  label?: string;
  id?: string;
  disabledClass?: string;
  newFormData?: object;
  emptyClass?: string;
  inputError?: {
    type: string;
    message: string;
  };
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowId?: string;
  style: object;
  disabled?: boolean;
  defaultValue?: number | string;
  placeholder?: string;
  value?: string;
}

function Input({
  id,
  type,
  name,
  register,
  placeholder,
  defaultValue,
  emptyClass,
  onChange,
  disabled,
  onClick,
  inputError,
  disabledClass,
  style,
  label,
  value,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      {label && (
        <label className="text-[1.2rem] font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        value={value}
        style={style}
        className={`${styles["input"]} ${disabledClass} ${emptyClass}`}
        name={name}
        type={type}
        onChange={onChange}
        onClick={onClick}
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        {...register}
      />
      {inputError && <ErrorMessage>{inputError?.message}</ErrorMessage>}
    </div>
  );
}

export default Input;
