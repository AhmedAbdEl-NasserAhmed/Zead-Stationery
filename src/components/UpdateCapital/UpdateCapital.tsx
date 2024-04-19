import { useAppSelector } from "../../interfaces/hooks";
import AddNewCapital from "../../features/AddNewCapital";
import UpdateCapitalList from "./UpdateCapitalList/UpdateCapitalList";

function UpdateCapital({ data }) {
  const { amount } = useAppSelector((state) => state.currentCapital);

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
