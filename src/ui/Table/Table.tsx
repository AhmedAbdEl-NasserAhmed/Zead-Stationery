import { ProductObject } from "../../interfaces/productObject";
import styles from "./Table.module.scss";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

interface Props {
  title: string;
  headers?: (object: ProductObject) => object[];
  data: ProductObject[];
  ExtraElement?: React.FC;
  extraElementProps?: {
    updateExistedProduct: ({ productsData, id }) => void;
    response: {
      isLoading: boolean;
    };
  };
  extraElementKey?: string;
}

function Table({
  title,
  headers,
  data,
  ExtraElement,
  extraElementProps,
  extraElementKey,
}: Props) {
  return (
    <div>
      <h2 className="mb-[2rem] text-3xl font-semibold ">{title}</h2>
      <table className={styles.table}>
        <thead>
          <TableHeader headers={headers} />
        </thead>
        <tbody>
          <TableRow
            extraElementKey={extraElementKey}
            extraElementProps={extraElementProps}
            ExtraElement={ExtraElement}
            headers={headers}
            data={data}
          />
        </tbody>
      </table>
    </div>
  );
}

export default Table;
