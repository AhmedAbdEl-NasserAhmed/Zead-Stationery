import currentDate from "../../helpers/currentDate";
import styles from "./LandingPage.module.scss";
import LocationNav from "../../ui/LocationNav/LocationNav";
import LocationLink from "../../ui/Link/LocationLink";
import { HiBell } from "react-icons/hi";
import { useEffect, useState } from "react";
import Container from "../../ui/Container/Container";
import AddBill from "../../features/AddBill";
import LandingPageList from "./LandingPageList/LandingPageList";
import { PositionObject } from "../../interfaces/positionObject";
import LandingPageLinkDataFactory from "./LandingPageLinkDataFactory/LandingPageLinkDataFactory";
import CreateReport from "../../components/CreateReport/CreateReport";
import { FaStore } from "react-icons/fa";

function LandingPage() {
  const date = currentDate();

  const [position, setPosition] = useState<PositionObject>({
    width: 0,
    right: 0,
    left: 0,
  });

  const [currentDatalink, setCurrentDataLink] = useState<string>("");

  function handler(e) {
    const id = e.target.id;

    const element = document.getElementById(id)! as HTMLElement;

    const rec = element.getBoundingClientRect();

    setPosition({
      right: rec.right,
      left: rec.left,
      width: rec.width,
    });
  }

  function setCurrentLink(link) {
    setCurrentDataLink(link);
  }

  function hanldeScrolling() {
    setPosition({
      right: 0,
      left: 0,
      width: 0,
    });
  }

  useEffect(() => {
    const landingPage = document.getElementById("landing-page");

    landingPage.addEventListener("scroll", hanldeScrolling);
  }, []);

  return (
    <>
      <div>
        <LocationNav
          Element={LocationLink}
          icon={<HiBell />}
          elementProps={{
            location: "/stock",
            name: "Go to the Store",
            icon: <FaStore />,
          }}
        />
      </div>
      <Container>
        <div id="landing-page" className={styles["landing-page"]}>
          <div className="flex justify-between">
            <div>
              <h2 className="text-5xl mb-10">Today: {date}</h2>
              <AddBill />
            </div>
            <div>
              <CreateReport />
            </div>
          </div>
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
