import React from 'react';
import styles from './loading.module.scss';

export const Loading: React.FC = () => {
  
  return (
    <div className={styles.wrapper}>
      <svg width="30" height="30" fill='none'>
        <use href="/icons.svg#loading"></use>
      </svg>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};
