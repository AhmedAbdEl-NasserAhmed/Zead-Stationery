import styles from "./LocationNav.module.scss";

interface ElementProps {
  location?: string;
  name?: string;
  icon?: React.ReactNode;
}

interface Props {
  Element: React.ComponentType<ElementProps>;
  elementProps: ElementProps;
  icon?: React.ReactNode;
}

function LocationNav({ Element, elementProps, icon }: Props) {
  return (
    <nav className={styles["location-nav"]}>
      <Element {...elementProps} />
      <span>{icon}</span>
    </nav>
  );
}

export default LocationNav;
