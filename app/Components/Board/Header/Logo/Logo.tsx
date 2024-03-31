import React from "react";
import classNames from "classnames";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.barContainer)}>
        <div className={classNames(`${styles.bar} ${styles.bar1}`)}> </div>
        <div className={classNames(`${styles.bar} ${styles.bar2}`)}> </div>
        <div className={classNames(`${styles.bar} ${styles.bar3}`)}> </div>
      </div>
        <h1>kanban</h1>
    </div>
  );
}

export default Logo;
