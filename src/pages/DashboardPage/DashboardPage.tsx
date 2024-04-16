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
  HiExclamationTriangle,
} from "react-icons/hi2";

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
          <li>
            <NavLink to="/missing">
              <span>
                <HiExclamationTriangle />
              </span>
              Missing Goods
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
        <div className={styles["store__location"]}>
          <h2>{name}</h2>
          <span>
            <HiBell />
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;