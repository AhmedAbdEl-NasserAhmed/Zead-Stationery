import { LandingPageLinks } from "../../../constatnts/LandingPageLinks";
import LandingPageSlider from "../../../ui/LandingPageSlider/LandingPageSlider";
import LandingPageItem from "./LandingPageItem/LandingPageItem";

function LandingPageList({ handler, position, setCurrentLink }) {
  return (
    <ul className="flex gap-[10rem] text-3xl font-medium text-purple-500">
      {LandingPageLinks(handler, setCurrentLink).map((link) => {
        return <LandingPageItem key={link.id} link={link} />;
      })}
      <LandingPageSlider position={position} />
    </ul>
  );
}

export default LandingPageList;
