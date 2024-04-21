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
    <div className={styles["location-nav"]}>
      <Element {...elementProps} />
      <span>{icon}</span>
    </div>
  );
}

export default LocationNav;
