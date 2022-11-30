import { FC } from "react";
import classNames from "classnames";
import { assets } from "./assets";
import styles from './styles.module.scss';

type IconProps = {
  name: 'arrow' | 'basket' | 'checkmark' | 'computer' | 'crossed-eye' | 'eye' |
  'four-cards' | 'half-star' | 'review' | 'search' | 'smartphone' | 'star' |
  'television' | 'transparent-star' | 'two-cards' | 'user' | 'washer';

  size: 'sm' | 'md' | 'lg' | 'xl';
}

export const Icon: FC<IconProps> = ({ name, size }) => {
  return (
    <img
      className={classNames(styles.icon, styles['icon--' + size])}
      src={assets[name]}
      alt="Icon"
    />
  );
};