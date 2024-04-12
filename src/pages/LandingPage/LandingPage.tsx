import currentDate from "../../helpers/currentDate";
import styles from "./LandingPage.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../interfaces/hooks";
import { move } from "../../store/slices/sliderSlice";

function LandingPage() {
  const date = currentDate();

  const slideBar = useAppSelector((state) => state.slider);

  const dispatch = useAppDispatch();

  function handler(e) {
    const id = e.target.id;

    const element = document.getElementById(id)! as HTMLElement;

    const rec = element.getBoundingClientRect();

    dispatch(move(rec.right, rec.left, rec.width));
  }

  return (
    <div>
      <div>
        <Link to="/stock">Go To Store</Link>
        <h2 className="text-6xl">Today: {date}</h2>
      </div>
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
            width: slideBar.width,
            left: slideBar.left,
            right: slideBar.right,
          }}
          className={styles["slider"]}
        ></span>
      </ul>
    </div>
  );
}

export default LandingPage;
