import React from 'react';
import classNames from 'classnames';
import styles from './ScreenContentContainer.module.scss';

type Props = {
  children: any,
  style: Object,
};

const ScreenContentContainer = ({ children, style }: Props) => (
  <div className={classNames([styles['screen-container'], style])}>
    {children}
  </div>
);

export { ScreenContentContainer };
