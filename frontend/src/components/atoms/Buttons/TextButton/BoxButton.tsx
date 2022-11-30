import { FC } from "react";
import classNames from "classnames";
import styles from './styles.module.scss';

type BoxButtonProps = {
  type: 'box' | 'text';
  boxColor?: 'orange' | 'transparent' | 'blue';
  textColor?: 'black' | 'blue';
  isWithIcon: boolean;
}

export const BoxButton: FC<BoxButtonProps> = ({ type, background, color,  }) => {
  return (
    <button>

    </button>
  );
};