import { useState } from "react";
import Input from "../../ui/Input/Input";
import ExistedItemsData from "./ExistedItemsData/ExistedItemsData";

function SmartSearchInput({
  filtredData,
  settersValue,
  onClick,
  optionElementProps,
  rowId,
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
  selecteditem,
  type,
  onClickItem,
}) {
  const [showExistedListItems, setShowExistedListItems] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col relative items-center justify-center self-start ">
      <div className="relative">
        <Input
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
        {disabled && (
          <OptionElement
            rowId={rowId}
            optionElementProps={optionElementProps}
          />
        )}
      </div>
      {showExistedListItems && inputData !== undefined && (
        <ExistedItemsData
          selecteditem={selecteditem}
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
