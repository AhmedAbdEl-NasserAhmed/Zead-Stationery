import styles from "./ClearInputsData.module.scss";

function ClearInputsData({ optionElementProps, rowId }) {
  return (
    <span
      onClick={() => optionElementProps(rowId)}
      className={styles["clear-inputs"]}
    >
      X
    </span>
  );
}

export default ClearInputsData;
