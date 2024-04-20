import styles from "./LandingPageSlider.module.scss";

function LandingPageSlider({ position }) {
  return (
    <span
      style={{
        width: position.width,
        left: position.left,
        right: position.right,
      }}
      className={styles["slider"]}
    ></span>
  );
}

export default LandingPageSlider;
