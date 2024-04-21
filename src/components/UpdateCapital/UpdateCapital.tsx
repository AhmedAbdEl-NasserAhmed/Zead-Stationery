import { useAppSelector } from "../../interfaces/hooks";
import AddNewCapital from "../../features/AddNewCapital";
import UpdateCapitalList from "./UpdateCapitalList/UpdateCapitalList";
import { useUpdateCapitalDataMutation } from "../../services/capitalApi";
import { useUpdateCapitalHistoryDataMutation } from "../../services/capitalHistory";
import Spinner from "../../ui/Spinner/Spinner";

function UpdateCapital({ data }) {
  const { amount } = useAppSelector((state) => state.currentCapital);

  const [updateCapital, response] = useUpdateCapitalDataMutation();

  const [updateCapitalHistory] = useUpdateCapitalHistoryDataMutation();

  if (response.isLoading) return <Spinner />;

  return (
    <div className="flex flex-col justify-between gap-[10rem] ">
      <div className="flex justify-between items-center bg-purple-600 p-10 ">
        <h2 className="text-3xl font-semibold uppercase text-white">
          Current Capital : {amount} EGP
        </h2>
        <AddNewCapital
          updateCapital={updateCapital}
          updateCapitalHistory={updateCapitalHistory}
        />
      </div>
      <UpdateCapitalList data={data} />
    </div>
  );
}

export default UpdateCapital;
