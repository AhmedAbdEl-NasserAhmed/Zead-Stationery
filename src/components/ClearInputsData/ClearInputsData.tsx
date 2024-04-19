import styles from "./ClearInputsData.module.scss";

interface OptionElementProps {
  clearInputsDataClick: (rowId: string) => void;

  position: {
    top: string;
    right: string;
  };

  rowId: string;
}

function ClearInputsData({
  position,
  rowId,
  clearInputsDataClick,
}: OptionElementProps) {
  return (
    <span
      style={position}
      onClick={() => clearInputsDataClick(rowId)}
      className={styles["clear-inputs"]}
    >
      X
    </span>
  );
}

export default ClearInputsData;
