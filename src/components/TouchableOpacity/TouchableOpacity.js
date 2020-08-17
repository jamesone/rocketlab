// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './TouchableOpacity.module.scss';

type Props = {
  children: any,
  onClick: void,
  style: any,
};

const TouchableOpacity = ({ onClick, style, children }: Props) => (
  <div
    onClick={onClick}
    className={classNames([styles['touchable-opacity'], style])}>
    {children}
  </div>
);

export { TouchableOpacity };
