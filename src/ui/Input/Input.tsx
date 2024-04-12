import { formatErrorObject } from "../../helpers/formatErrorObject";
import { formatFormData } from "../../helpers/formatFormData";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";

import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  size?: string;
  register: UseFormRegister<FieldValues>;
  errors: object;
  formData?: object;
  onClick?: () => void;
  rowId?: string;
  disabled?: boolean;
  defaultValue?: number;
  validtionInputs?: {
    required: {
      value: boolean;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
  };
  placeholder?: string;
}

function Input({
  size,
  type,
  register,
  name,
  placeholder,
  validtionInputs,
  errors,
  defaultValue,
  formData,
  disabled,
  onClick,
}: InputProps) {
  function inputStyle() {
    let inputStyle = {
      width: "100%",
    };

    switch (size) {
      case "sm": {
        inputStyle = {
          width: "25%",
        };
        break;
      }
      case "md": {
        inputStyle = {
          width: "50%",
        };
        break;
      }
      case "lg": {
        inputStyle = {
          width: "75%",
        };
      }
    }

    return inputStyle;
  }

  const newFormData = formatFormData(formData);

  const newFormErros = formatErrorObject(errors);

  return (
    <div className="flex flex-col gap-2 ">
      <input
        onClick={onClick}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`${styles["input"]} ${disabled ? "bg-slate-200" : ""} 
          ${newFormData[name] === "" ? "empty" : ""}      
        `}
        style={{ width: inputStyle().width }}
        placeholder={placeholder}
        type={type}
        name={name}
        {...register(name, validtionInputs)}
      />
      {newFormErros[name] && (
        <ErrorMessage>{newFormErros[name]?.message}</ErrorMessage>
      )}
    </div>
  );
}

export default Input;
