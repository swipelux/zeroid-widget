import React, { useState } from 'react';
import styles from './Input.module.css';
import { Eye, CrossedEye } from '../icons/Eye.tsx';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  helpText?: string;
  label?: string;
  error?: boolean;
  dataTestId?: string;
  rightSide?: React.ReactNode;
};

export const Input = (props: Props) => {
  const {
    helpText,
    placeholder,
    value,
    onChange,
    label,
    error,
    autoFocus,
    dataTestId,
    disabled,
    style,
    name,
    maxLength,
    id,
    rightSide,
    type,
  } = props;

  const inputClassName = `${styles.input} ${error ? styles.error : ''}`;
  const helperTextClassName = `${styles.helper} ${error ? styles.error : ''}`;
  const wrapperClassName = `${styles.wrapper} ${error ? styles.error : ''}`;

  return (
    <div style={style}>
      {label && (
        <p className={`${styles.label} ${error ? styles.label_error : ''}`}>
          {label}
        </p>
      )}
      <div className={wrapperClassName}>
        <input
          className={inputClassName}
          id={id}
          disabled={disabled}
          data-test-id={dataTestId}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          type={type}
        />
        {rightSide}
      </div>
      <div className={helperTextClassName}>{helpText}</div>
    </div>
  );
};

export function PassportInput(props: Props) {
  const [show, setShow] = useState(false);

  const Component = show ? Eye : CrossedEye;

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      rightSide={<Component className={styles.icon} onClick={() => setShow((v) => !v)} />}
    />
  );
}
