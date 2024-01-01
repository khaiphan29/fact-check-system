'use client'

import styles from "./DashboardStyle/Card.module.css"

const Card = ({data, label, icon}) => {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.datacontainer}>
          <div>
            <h4 className={styles.data}>{data}</h4>
            <span className={styles.label}>{label}</span>
          </div>
        </div>
      </div>
    );
  }

  export default Card;