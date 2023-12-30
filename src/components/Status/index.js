import React from "react";
import styles from "./styles.module.css";
const index = ({ data }) => {

  const getColor = () => {
    return parseInt(100*Math.random(), 10) % 2;
  };
  return (
    <div className={styles.logos}>
      <div className={styles.logos_slide}>
        {(data || [])?.map((item) => {
          return (
            <div key={item?.id} className={styles.item}>
              {item?.symbol} :{" "}
              <div style={{ color: getColor() ? "#f30322" : "#00ee00", paddingLeft:'4px' }}>
                {parseFloat(item?.price).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
