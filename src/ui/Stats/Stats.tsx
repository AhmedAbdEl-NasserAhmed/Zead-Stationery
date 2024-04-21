import { FaBoxes, FaClipboardCheck, FaDollarSign } from "react-icons/fa";
import Stat from "../Stat/Stat";
import { useGetGoodsDataQuery } from "../../services/goodsApi";
import { calculatingTotalGoods } from "../../helpers/calculatingTotalGoods";
import Spinner from "../Spinner/Spinner";
import styles from "./Stats.module.scss";

import StaticChart from "../StaticChart/StaticChart";
import { calculatingTotalPrices } from "../../helpers/calculatingTotalPrices";
import { useGetBillslDataQuery } from "../../services/billsAPi";

function Stats() {
  const { data: bills, isLoading: isLoadingBills } =
    useGetBillslDataQuery("bills");

  const { data: goods, isLoading: isLoadingGoods } =
    useGetGoodsDataQuery("goods");

  const totalGoods = calculatingTotalGoods({ goods });

  const { totalPrice } = calculatingTotalPrices({ bills });

  if (isLoadingGoods || isLoadingBills) return <Spinner />;

  return (
    <div className={styles["stats"]}>
      <div className={styles["stats__data"]}>
        <Stat
          heading="Total Purchases"
          Details={`${totalGoods} EGP`}
          icon={<FaBoxes />}
          bgColor="#f5f116"
          color="#aea004"
        />
        <Stat
          heading="Total Income"
          Details={`${totalPrice} EGP`}
          icon={<FaDollarSign />}
          bgColor="#07ed99"
          color="#118f08"
        />
        <Stat
          heading="Total Bills"
          Details={bills.length}
          icon={<FaClipboardCheck />}
          bgColor="#3890e3"
          color="#0c4070"
        />
      </div>
      <div className={styles["stats__charts"]}>
        <StaticChart />
      </div>
    </div>
  );
}

export default Stats;
