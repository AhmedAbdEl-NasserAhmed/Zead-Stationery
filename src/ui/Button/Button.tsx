import styles from "./Button.module.scss";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variation: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

interface Variations {
  primary: string;
  secondary: string;
  danger: string;
}

const variations: Variations = {
  primary: "bg-blue-500",
  secondary: "bg-zinc-500",
  danger: "bg-red-600",
};

function Button({ disabled, variation, type, onClick, children }: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles["btn"]} ${variations[variation]} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
