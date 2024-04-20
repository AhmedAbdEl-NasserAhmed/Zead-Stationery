import { CurrentDataLink } from "../enums/enums";

export function LandingPageLinks(handler, setCurrentLink) {
  return [
    {
      id: "link-1",
      name: "Goods",
      onClick(e) {
        handler(e);
        setCurrentLink(CurrentDataLink.GOODS);
      },
    },
    {
      id: "link-2",
      name: "Bills",
      onClick(e) {
        handler(e);
        setCurrentLink(CurrentDataLink.BILLS);
      },
    },
    {
      id: "link-3",
      name: "Returned Bills",
      onClick(e) {
        handler(e);
        setCurrentLink(CurrentDataLink.RETURNEDGOODS);
      },
    },
  ];
}
