import currentDate from "../../helpers/currentDate";
import styles from "./LandingPage.module.scss";
import LocationNav from "../../ui/LocationNav/LocationNav";
import LocationLink from "../../ui/Link/LocationLink";
import { HiBell } from "react-icons/hi";
import { useState } from "react";

function LandingPage() {
  const date = currentDate();

  const [position, setPosition] = useState({
    right: 0,
    left: 0,
    width: 20,
  });

  function handler(e) {
    const id = e.target.id;

    const element = document.getElementById(id)! as HTMLElement;

    const rec = element.getBoundingClientRect();

    setPosition({ right: rec.right, left: rec.left, width: rec.width });
  }

  return (
    <div>
      <LocationNav
        Element={LocationLink}
        elementProps={{
          location: "/stock",
          name: "Go to the Store",
          icon: <HiBell />,
        }}
      />
      <h2 className="text-5xl">Today: {date}</h2>
      <ul id="links-container" className=" relative flex justify-between">
        <li id="link-1" onClick={handler}>
          goods
        </li>
        <li id="link-2" onClick={handler}>
          bills
        </li>
        <li id="link-3" onClick={handler}>
          missing goods
        </li>
        <li id="link-4" onClick={handler}>
          out goods
        </li>
        <span
          style={{
            width: position.width,
            left: position.left,
            right: position.right,
          }}
          className={styles["slider"]}
        ></span>
      </ul>
    </div>
  );
}

export default LandingPage;
