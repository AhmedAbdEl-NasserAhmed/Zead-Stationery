import { useAppSelector } from "../../interfaces/hooks";
import { useGetCapitalHistoryDataQuery } from "../../services/capitalHistory";
import Spinner from "../../ui/Spinner/Spinner";
import AddNewCapital from "../../features/AddNewCapital";
import UpdateCapitalList from "./UpdateCapitalList/UpdateCapitalList";

function UpdateCapital() {
  const { amount } = useAppSelector((state) => state.currentCapital);

  const { data, isLoading } = useGetCapitalHistoryDataQuery("capitalHistory");

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-between gap-[10rem] ">
      <div className="flex justify-between items-center bg-purple-600 p-10 ">
        <h2 className="text-3xl font-semibold uppercase text-white">
          Current Capital : {amount} EGP
        </h2>
        <AddNewCapital />
      </div>
      <UpdateCapitalList data={data} />
    </div>
  );
}

export default UpdateCapital;
