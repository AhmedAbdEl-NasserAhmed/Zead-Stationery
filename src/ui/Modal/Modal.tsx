import {
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import useClickoutSide from "../../hooks/useClickoutSide";

interface ModalContext {
  openName: string;
  close: (openName: string) => void;
  openModal: (openName: string) => void;
}

const ModalContext = createContext({} as ModalContext);

interface Props {
  children: React.ReactNode;
}

interface OpenProps {
  children: ReactElement;
  opens: string;
}

interface WindowProps {
  children: ReactElement;
  name: string;
}

function Modal({ children }: Props) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const openModal = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: modalWindowName }: OpenProps) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(modalWindowName) });
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  const modalRef = useClickoutSide({ closeFc: close, value: "" });

  if (name !== openName) return null;

  return createPortal(
    <div className={styles["overlay"]}>
      <div ref={modalRef} className={styles["modal"]}>
        <div>{cloneElement(children, { setShowModal: close })}</div>
      </div>
    </div>,
    document.getElementById("modal")! as HTMLElement
  );
}

Modal.Open = Open;

Modal.Window = Window;

export default Modal;
