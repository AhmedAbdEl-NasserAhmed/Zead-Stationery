import { createContext, useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import styles from "./Menus.module.scss";
import useClickoutSide from "../../hooks/useClickoutSide";
import { createPortal } from "react-dom";

interface MenusButton {
  children: React.ReactNode;
  onClick?: () => void;
  icon: React.ReactElement;
}

interface MenusContext {
  openId?: string;
  openMenus?: (id: string) => void;
  closeMenus?: () => void;
  position?: {
    x: number;
    y: number;
  };
  setPosition?: (object) => void;
}

interface Props {
  children: React.ReactNode;
}

const MenusContext = createContext<MenusContext>({});

function Menus({ children }: Props) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const closeMenus = () => setOpenId("");

  const openMenus = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, closeMenus, openMenus, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className={styles["menus__menu"]}>{children}</div>;
}

function Toggle({ id }) {
  const { openId, openMenus, closeMenus, setPosition } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x + 20,
      y: rect.y + rect.height - 8,
    });

    id === "" || openId !== id ? openMenus(id) : closeMenus();
  }

  return (
    <button className={styles["menus__toggle"]} onClick={handleClick}>
      <HiDotsVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, closeMenus } = useContext(MenusContext);

  const ref = useClickoutSide({
    closeFc: closeMenus,
    value: "",
    stopBubbling: false,
  });

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ top: position.y, right: position.x }}
      className={styles["menus__list"]}
    >
      {children}
    </ul>,

    document.body
  );
}

function Button({ children, icon, onClick }: MenusButton) {
  const { closeMenus } = useContext(MenusContext);

  function hanldeClick() {
    onClick();
    closeMenus();
  }

  return (
    <li>
      <button onClick={hanldeClick} className={styles["menus__button"]}>
        {icon} <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
