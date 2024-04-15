import { goodsTableContent } from "../../constatnts/goodsTableContent";
import { useGetGoodsDataQuery } from "../../services/goodsApi";
import Menus from "../../ui/Menus/Menus";
import Spinner from "../../ui/Spinner/Spinner";
import Table from "../../ui/Table/Table";
import EditGood from "./EditGood/EditGood";
import styles from "./goodsPage.module.scss";

function GoodsPage() {
  const { data, isLoading } = useGetGoodsDataQuery("goods");

  if (isLoading) return <Spinner />;

  return (
    <div className={styles["goods-page"]}>
      <Menus>
        <Table
          title={"Goods"}
          data={data}
          headers={goodsTableContent}
          ExtraElement={EditGood}
        />
      </Menus>
    </div>
  );
}

export default GoodsPage;
