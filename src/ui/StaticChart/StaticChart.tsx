import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetBillslDataQuery } from "../../services/billsAPi";
import { calculatingTotalPrices } from "../../helpers/calculatingTotalPrices";
import { format } from "date-fns";
import { useGetPurchasesDataQuery } from "../../services/purchasesApi";
import { calculatingTotalPurchases } from "../../helpers/calculatingTotalPurchaes";
import Spinner from "../Spinner/Spinner";

function StaticChart() {
  const { data: bills, isLoading: isLoadingBills } =
    useGetBillslDataQuery("bills");

  const { newDataArray } = calculatingTotalPrices({ bills });

  const { data: purchases, isLoading: isLoadingPurchases } =
    useGetPurchasesDataQuery("purchases");

  const totalPurchases = calculatingTotalPurchases({ purchases });

  const dates = newDataArray.map((product) => {
    return format(product.date, "MMM dd");
  });

  const uniqueDates = [...new Set(dates)];

  const data = uniqueDates.map((date) => {
    return {
      label: date,
      totalIncome: newDataArray
        .filter((product) => {
          return format(product.date, "MMM dd") === date;
        })
        .reduce((acc, product) => {
          return acc + product.totalPrice;
        }, 0),
      totalPurchases: totalPurchases
        .filter((product) => {
          return format(product.date, "MMM dd") === date;
        })
        .reduce((acc, product) => {
          return acc + +product.piecesCount * +product.piecesPrice;
        }, 0),
    };
  });

  if (isLoadingPurchases || isLoadingBills) return <Spinner />;

  return (
    <div>
      <h2 className="text-4xl mb-5 font-semibold">Total Sales & Income</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="label" />
          <YAxis unit="EGP" />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip />
          <Area
            dataKey="totalIncome"
            type="monotone"
            stroke="#6b28d5"
            fill="#6b28d5"
            strokeWidth={2}
            name="Total Income"
            unit="EGP"
          />
          <Area
            dataKey="totalPurchases"
            type="monotone"
            stroke="#b1af21"
            fill="#f5f116"
            strokeWidth={2}
            name="Total Goods"
            unit="EGP"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StaticChart;
