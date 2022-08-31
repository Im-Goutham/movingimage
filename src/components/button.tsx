import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.css';

type ButtonProps = {
  primary?: boolean;
  danger?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ primary, danger, ...props }: ButtonProps) => {
  let className = styles.button;

  if (primary) className += ` ${styles.primary}`;

  if(danger) className += ` ${styles.danger}`;

  return <button className={className} {...props} />;
};
