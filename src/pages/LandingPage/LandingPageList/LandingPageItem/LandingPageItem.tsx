import LandingPageSlider from "../../../../ui/LandingPageSlider/LandingPageSlider";

function LandingPageItem({ link, position }) {
  return (
    <>
      <li id={link.id} onClick={link.onClick} className=" cursor-pointer">
        {link.name}
      </li>
      <LandingPageSlider position={position} />
    </>
  );
}

export default LandingPageItem;
