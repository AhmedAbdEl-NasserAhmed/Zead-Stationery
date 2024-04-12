import { DateOptions } from "../interfaces/dateOptions";

function currentDate() {
  const date = new Date(Date.now());

  const options: DateOptions = {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const getCurrentDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  return getCurrentDate;
}

export default currentDate;
