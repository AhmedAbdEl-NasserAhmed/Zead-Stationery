import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";

import { UseFormRegisterReturn } from "react-hook-form";

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
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      {label && (
        <label className="text-[1.2rem] font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
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

// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import styles from "./Input.module.scss";

// import { UseFormRegister, FieldValues } from "react-hook-form";

// interface InputProps {
//   type: string;
//   name: string;
//   size?: string;
//   register: UseFormRegister<FieldValues>;
//   newFormErros: object;
//   label?: string;
//   id?: string;
//   newFormData?: object;
//   onClick?: () => void;
//   rowId?: string;
//   disabled?: boolean;
//   defaultValue?: number | string;
//   validtionInputs?: {
//     required: {
//       value: boolean;
//       message: string;
//     };
//     min?: {
//       value: number;
//       message: string;
//     };
//   };
//   placeholder?: string;
// }

// function Input({
//   size,
//   id,
//   type,
//   register,
//   name,
//   placeholder,
//   validtionInputs,
//   newFormErros,
//   defaultValue,
//   newFormData,
//   disabled,
//   onClick,
//   label,
// }: InputProps) {
//   function inputStyle() {
//     let inputStyle = {
//       width: "100%",
//     };

//     switch (size) {
//       case "sm": {
//         inputStyle = {
//           width: "25%",
//         };
//         break;
//       }
//       case "md": {
//         inputStyle = {
//           width: "50%",
//         };
//         break;
//       }
//       case "lg": {
//         inputStyle = {
//           width: "75%",
//         };
//       }
//     }

//     return inputStyle;
//   }

//   return (
//     <div className="flex flex-col gap-2 ">
//       {label && (
//         <label className="text-[1.2rem] font-medium" htmlFor={id}>
//           {label}
//         </label>
//       )}
//       <input
//         onClick={onClick}
//         defaultValue={defaultValue}
//         disabled={disabled}
//         className={`${styles["input"]} ${disabled ? "bg-slate-200" : ""}
//           ${newFormData[name] === "" ? "empty" : ""}
//         `}
//         style={{ width: inputStyle().width }}
//         placeholder={placeholder}
//         type={type}
//         name={name}
//         {...register(name, validtionInputs)}
//       />
//       {newFormErros && newFormErros[name] && (
//         <ErrorMessage>{newFormErros[name]?.message}</ErrorMessage>
//       )}
//     </div>
//   );
// }

// export default Input;
