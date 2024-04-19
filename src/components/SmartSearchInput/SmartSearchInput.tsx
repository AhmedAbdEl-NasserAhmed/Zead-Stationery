import { useState } from "react";
import Input from "../../ui/Input/Input";
import ExistedItemsData from "./ExistedItemsData/ExistedItemsData";
import {
  Path,
  SetValueConfig,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

interface OptionElementProps {
  clearInputsDataClick: (rowId: string) => void;

  position: {
    top: string;
    right: string;
  };

  rowId: string;
}

interface Props {
  filtredData: object[];
  label: string;
  onClick: (closeFc: (open: boolean) => void) => void;
  optionElementProps: OptionElementProps;
  OptionElement: React.ComponentType<OptionElementProps>;
  emptyClassName: string;
  register: UseFormRegister<FieldValues>;
  setBillProductQuantity?: () => void;
  settersValue: object;
  inputData: string;
  name: string;
  newFormErros: object;
  disabled: boolean;
  disabledClass: string;
  placeholder: string;

  setValue: <TFieldValues>(
    name: Path<TFieldValues>,
    value: TFieldValues[keyof TFieldValues],
    options?: SetValueConfig
  ) => void;

  selectedItem: object;
  type: string;

  onClickItem: (item: object, closeFc: (open: boolean) => void) => void;
}

function SmartSearchInput({
  filtredData,
  label,
  settersValue,
  onClick,
  optionElementProps,
  setBillProductQuantity,
  emptyClassName,
  OptionElement,
  register,
  inputData,
  name,
  newFormErros,
  disabled,
  disabledClass,
  placeholder,
  setValue,
  selectedItem,
  type,
  onClickItem,
}: Props) {
  const [showExistedListItems, setShowExistedListItems] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col relative items-center justify-center self-start ">
      <div className="relative">
        <Input
          label={label}
          onClick={() => onClick(setShowExistedListItems)}
          type={type}
          style={{ width: `${100}%` }}
          disabled={disabled}
          placeholder={placeholder}
          disabledClass={disabled ? disabledClass : ""}
          emptyClass={emptyClassName}
          register={{
            ...register(name, {
              required: {
                value: true,
                message: "This field is required",
              },
            }),
          }}
          inputError={newFormErros[name]}
        />
        {disabled && <OptionElement {...optionElementProps} />}
      </div>
      {showExistedListItems && inputData !== undefined && (
        <ExistedItemsData
          setBillProductQuantity={setBillProductQuantity}
          selectedItem={selectedItem}
          closeMenuFc={setShowExistedListItems}
          filtredData={filtredData}
          settersValue={settersValue}
          setValue={setValue}
          onClickItem={onClickItem}
        />
      )}
    </div>
  );
}

export default SmartSearchInput;
