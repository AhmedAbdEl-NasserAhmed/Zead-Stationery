import Container from "../../ui/Container/Container";

import styles from "./CapitalPage.module.scss";
import UpdateCapital from "../../components/UpdateCapital/UpdateCapital";
import { useGetCapitalHistoryDataQuery } from "../../services/capitalHistory";
import Spinner from "../../ui/Spinner/Spinner";

function CapitalPage() {
  const { data, isLoading } = useGetCapitalHistoryDataQuery("capitalHistory");

  if (isLoading) return <Spinner />;

  return (
    <Container>
      <div className={styles["capital-page"]}>
        <UpdateCapital data={data} />
      </div>
    </Container>
  );
}

export default CapitalPage;
