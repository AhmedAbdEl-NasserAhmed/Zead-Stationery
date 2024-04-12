import Calendar from "react-calendar";
import { useState } from "react";
import useClickoutSide from "../../hooks/useClickoutSide";
import styles from "./DateBar.module.scss";
import "../../styles/calender.scss";
import { HiCalendar } from "react-icons/hi";

interface Props {
  title: string;
  setDate: (Date: Date) => void;
  date: Date;
}

function DateBar({ title, setDate, date }: Props) {
  const [showCalender, setShowCalender] = useState<boolean>(false);

  const ref = useClickoutSide({ closeFc: setShowCalender, value: false });

  const today = new Date(Date.now()).toDateString();

  const currentData = date.toDateString();

  return (
    <div className={styles["dateBar-container"]}>
      <h2>{title}</h2>
      <div
        onClick={() => setShowCalender((calender) => !calender)}
        className="flex bg-purple-900 px-3 py-2 rounded-lg  items-center gap-5 cursor-pointer"
      >
        <h2>
          {currentData} {`${date.toDateString() === today ? "/ Today" : ""}`}
        </h2>
        <span>
          <HiCalendar />
        </span>
      </div>

      {showCalender && (
        <div ref={ref} className={styles["calender-container"]}>
          <Calendar
            onClickDay={() => setShowCalender(false)}
            onChange={(selectedDate: Date) => setDate(selectedDate)}
            value={date}
          />
        </div>
      )}
    </div>
  );
}

export default DateBar;
