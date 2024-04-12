import AddBill from "../../features/AddBill";
import Container from "../../ui/Container/Container";
import styles from "./BillsPage.module.scss";

function BillsPage() {
  return (
    <Container>
      <div className={styles["bills-page"]}>
        <AddBill />
      </div>
    </Container>
  );
}

export default BillsPage;
