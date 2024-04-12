import styles from "./UpdateCapitalList.module.scss";

function UpdateCapitalList({ data }) {
  const arrangedData = data.slice().sort((a, b) => {
    const date1 = new Date(a.date);

    const date2 = new Date(b.date);

    return date2.getTime() - date1.getTime();
  });

  return (
    <ul className={styles["updatedCapitals"]}>
      <h2 className={styles["updatedCapitals__heading"]}>Capital History</h2>
      {arrangedData?.map((oldCapital) => {
        return (
          <li className={styles["updatedCapitals__item"]} key={oldCapital.id}>
            <h2>+ {oldCapital.capital} EGP </h2>
            <p>{oldCapital.date} </p>
          </li>
        );
      })}
    </ul>
  );
}

export default UpdateCapitalList;
