
import React from 'react';
import styles from './styles.module.css';

const TwoLineResult = ({ result }) => {

  return (
    <div className={styles.result}>
        Exchange Result
      <h4 className={styles.title}>{`${result?.amount} ${result?.symbol} = ${parseFloat(result?.value).toFixed(2)} ${result?.currency}`}</h4>
    </div>
  );
};

export default TwoLineResult;
