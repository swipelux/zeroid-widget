import styles from './button.module.css';
import React from 'react';
export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  logo?: React.ReactNode;
}

export const Button = ({
  logo,
  isLoading,
  disabled,
  onClick,
  label,
}: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={onClick} disabled={disabled}>
      {logo}
      {label}
      {isLoading ? <div className={styles.loader} /> : null}
    </button>
  );
};
