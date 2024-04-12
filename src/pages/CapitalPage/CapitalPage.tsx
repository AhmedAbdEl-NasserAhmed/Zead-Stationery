import Container from "../../ui/Container/Container";

import styles from "./CapitalPage.module.scss";
import UpdateCapital from "../../components/UpdateCapital/UpdateCapital";

function CapitalPage() {
  return (
    <Container>
      <div className={styles["capital-page"]}>
        <UpdateCapital />
      </div>
    </Container>
  );
}

export default CapitalPage;
