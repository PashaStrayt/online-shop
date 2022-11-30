import { FC, ReactNode } from "react";
import classNames from "classnames";
import styles from './styles.module.scss';

type BoxButtonProps = {
  color: 'orange' | 'transparent' | 'blue';
  px?: 0 | 1 | 2 | 3 | 4 | 5;
  py?: 0 | 1 | 2 | 3 | 4 | 5;
  gap?: 0 | 1 | 2 | 3 | 4 | 5;
  isWithIcon: boolean;
  children?: ReactNode;
  clickHandler: () => void;
}

export const BoxButton: FC<BoxButtonProps> = ({ color, px = 0, py = 0, gap = 0, isWithIcon, children, clickHandler }) => {
  return (
    <button className="d-flex ">
      {children}
    </button>
  );
};