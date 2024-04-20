import BillsDataLink from "./BillsDataLink/BillsDataLink";
import GoodsDataLink from "./GoodsDataLink/GoodsDataLink";
import ReturnedDataLink from "./ReturnedDataLink/ReturnedDataLink";

interface Props {
  type: string;
}

function LandingPageLinkDataFactory({ type }: Props) {
  switch (type) {
    case "goods": {
      return <GoodsDataLink />;
    }
    case "bills": {
      return <BillsDataLink />;
    }
    case "returnedGoods": {
      return <ReturnedDataLink />;
    }
    default:
      return <GoodsDataLink />;
  }
}

export default LandingPageLinkDataFactory;
