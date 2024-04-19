import styles from "./LocationNav.module.scss";

interface ElementProps {
  location?: string;
  name?: string;
  icon?: React.ReactNode;
}

interface Props {
  Element: React.ComponentType<ElementProps>;
  elementProps: ElementProps;
}

function LocationNav({ Element, elementProps }: Props) {
  return (
    <div className={styles["location-nav"]}>
      <Element {...elementProps} />
      <span>{elementProps.icon}</span>
    </div>
  );
}

export default LocationNav;
