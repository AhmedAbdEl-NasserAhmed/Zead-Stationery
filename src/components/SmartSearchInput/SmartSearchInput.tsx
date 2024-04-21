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
  onClick: () => void;
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
  emptyStringCondition: boolean;

  setValue: <TFieldValues>(
    name: Path<TFieldValues>,
    value: TFieldValues[keyof TFieldValues],
    options?: SetValueConfig
  ) => void;

  selectedItem: object;
  type: string;

  onClickItem: (item: object) => void;
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
  name,
  newFormErros,
  disabled,
  disabledClass,
  placeholder,
  setValue,
  selectedItem,
  type,
  onClickItem,
  emptyStringCondition,
}: Props) {
  return (
    <div className="flex flex-col relative items-center justify-center self-start ">
      <div className="relative">
        <Input
          label={label}
          onClick={() => onClick}
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
      {emptyStringCondition && filtredData?.length > 0 && (
        <ExistedItemsData
          setBillProductQuantity={setBillProductQuantity}
          selectedItem={selectedItem}
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
