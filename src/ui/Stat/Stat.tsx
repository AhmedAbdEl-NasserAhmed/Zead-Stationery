import styles from "./Stat.module.scss";

function Stat({ bgColor, icon, Details, heading, color }) {
  return (
    <div className={`${styles["stat"]} `}>
      <span style={{ backgroundColor: bgColor, color: color }}>{icon}</span>
      <div>
        <h2 className="text-[1.3rem] font-bold">{heading}</h2>
        <p className="text-[2.5rem]">{Details}</p>
      </div>
    </div>
  );
}

export default Stat;
