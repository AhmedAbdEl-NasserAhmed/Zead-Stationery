import styles from "./StockPage.module.scss";
import Container from "../../ui/Container/Container";
import Stats from "../../ui/Stats/Stats";

function StockPage() {
  return (
    <Container>
      <div className={styles["stock-page"]}>
        <Stats />
      </div>
    </Container>
  );
}

export default StockPage;
