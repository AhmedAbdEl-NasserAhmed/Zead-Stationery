import BillsDataLink from "./BillsDataLink/BillsDataLink";

interface Props {
  type: string;
}

function LandingPageLinkDataFactory({ type }: Props) {
  switch (type) {
    case "goods": {
      return <BillsDataLink />;
    }
    case "bills": {
      return <p>bills</p>;
    }
    case "returnedGoods": {
      return <p>returnedGoods</p>;
    }
    default:
      return <BillsDataLink />;
  }
}

export default LandingPageLinkDataFactory;
