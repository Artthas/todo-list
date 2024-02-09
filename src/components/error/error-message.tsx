import React from 'react';
import styles from './error-message.module.scss';

interface ErrorProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  
  return (
    <div className={styles.wrapper}>
      <svg width="30" height="30" fill='none'>
        <use href="/icons.svg#error"></use>
      </svg>
      <p className={styles.text}>{message}</p>
    </div>
  );
};
