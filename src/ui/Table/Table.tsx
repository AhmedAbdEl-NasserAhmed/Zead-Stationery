import { ProductObject } from "../../interfaces/productObject";
import styles from "./Table.module.scss";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

interface Props {
  title: string;
  headers: object[];
  data: ProductObject[];
  ExtraElement?: React.FC;
}

function Table({ title, headers, data, ExtraElement }: Props) {
  return (
    <div>
      <h2 className="mb-[2rem] text-3xl font-semibold ">{title}</h2>
      <table className={styles.table}>
        <thead>
          <TableHeader headers={headers} />
        </thead>
        <tbody>
          <TableRow ExtraElement={ExtraElement} headers={headers} data={data} />
        </tbody>
      </table>
    </div>
  );
}

export default Table;
