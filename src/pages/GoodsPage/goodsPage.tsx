import { goodsTableContent } from "../../constatnts/goodsTableContent";
import {
  useGetGoodsDataQuery,
  useUseUpdateExistedProductMutation,
} from "../../services/goodsApi";
import Menus from "../../ui/Menus/Menus";
import Spinner from "../../ui/Spinner/Spinner";
import Table from "../../ui/Table/Table";
import EditGood from "./EditGood/EditGood";
import styles from "./goodsPage.module.scss";

function GoodsPage() {
  const { data, isLoading } = useGetGoodsDataQuery("goods");

  const [updateExistedProduct, response] = useUseUpdateExistedProductMutation();

  if (isLoading || response.isLoading) return <Spinner />;

  return (
    <div className={styles["goods-page"]}>
      <Menus>
        <Table
          extraElementKey="Actions"
          title={"Goods"}
          data={data}
          headers={goodsTableContent}
          ExtraElement={EditGood}
          extraElementProps={{
            updateExistedProduct: updateExistedProduct,
            response: response,
          }}
        />
      </Menus>
    </div>
  );
}

export default GoodsPage;
