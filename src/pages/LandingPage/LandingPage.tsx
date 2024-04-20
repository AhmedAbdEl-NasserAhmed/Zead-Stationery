import currentDate from "../../helpers/currentDate";
import styles from "./LandingPage.module.scss";
import LocationNav from "../../ui/LocationNav/LocationNav";
import LocationLink from "../../ui/Link/LocationLink";
import { HiBell } from "react-icons/hi";
import { useState } from "react";
import Container from "../../ui/Container/Container";
import AddBill from "../../features/AddBill";
import LandingPageList from "./LandingPageList/LandingPageList";
import { PositionObject } from "../../interfaces/positionObject";
import LandingPageLinkDataFactory from "./LandingPageLinkDataFactory/LandingPageLinkDataFactory";

function LandingPage() {
  const date = currentDate();

  const [position, setPosition] = useState<PositionObject>({
    width: `${56.7955}px`,
    right: `${224.977}px`,
    left: `${168.182}px`,
  });

  const [currentDatalink, setCurrentDataLink] = useState<string>("");

  function handler(e) {
    const id = e.target.id;

    const element = document.getElementById(id)! as HTMLElement;

    const rec = element.getBoundingClientRect();

    console.log("rec", rec);

    setPosition({
      right: rec.right,
      left: rec.left,
      width: rec.width,
    });
  }

  function setCurrentLink(link) {
    setCurrentDataLink(link);
  }

  return (
    <>
      <div>
        <LocationNav
          Element={LocationLink}
          elementProps={{
            location: "/stock",
            name: "Go to the Store",
            icon: <HiBell />,
          }}
        />
      </div>
      <Container>
        <div className={styles["landing-page"]}>
          <h2 className="text-5xl">Today: {date}</h2>
          <AddBill />
          <hr />
          <LandingPageList
            setCurrentLink={setCurrentLink}
            handler={handler}
            position={position}
          />
          <LandingPageLinkDataFactory type={currentDatalink} />
        </div>
      </Container>
    </>
  );
}

export default LandingPage;
