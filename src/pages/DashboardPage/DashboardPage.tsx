import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./DashboardPage.module.scss";
import {
  HiBell,
  HiCurrencyDollar,
  HiHome,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import {
  HiArchiveBox,
  HiArrowPath,
  HiArrowUturnLeft,
  HiDocumentMinus,
} from "react-icons/hi2";
import LocationNav from "../../ui/LocationNav/LocationNav";
import LocationNavHeading from "../../ui/LocationNavHeading/LocationNavHeading";

function DashboardPage() {
  const location = useLocation();

  const name = location.pathname.replace("/", "").toUpperCase();

  return (
    <div className={styles["store"]}>
      <div className={styles["store__links"]}>
        <h2 className={styles["store__links-heading"]}>Zead Stationery</h2>
        <ul className={styles["store__links-list"]}>
          <li>
            <NavLink to="/stock">
              <span>
                <HiHome />
              </span>{" "}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/capital">
              <span>
                <HiCurrencyDollar />
              </span>{" "}
              Capital
            </NavLink>
          </li>
          <li>
            <NavLink to="/goods">
              <span>
                <HiArchiveBox />
              </span>
              Goods
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchases">
              <span>
                <HiOutlineShoppingCart />
              </span>
              Purchases
            </NavLink>
          </li>
          <li>
            <NavLink to="/bills">
              <span>
                <HiDocumentMinus />
              </span>
              Bills
            </NavLink>
          </li>
          <li>
            <NavLink to="/returned">
              <span>
                <HiArrowPath />
              </span>
              Returned Goods
            </NavLink>
          </li>
        </ul>
        <Link to="/" className={styles["store__links-back"]}>
          <span>
            <HiArrowUturnLeft />
          </span>
          Back to landing page
        </Link>
      </div>
      <div>
        <LocationNav
          Element={LocationNavHeading}
          elementProps={{
            name: name,
            icon: <HiBell />,
          }}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
