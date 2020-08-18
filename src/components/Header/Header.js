// @flow
import React from 'react';
import { navigate } from 'hookrouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../../navigation/config';
import styles from './Header.module.scss';

type Props = {
  title: string,
  hideRightBtn?: boolean,
  hideLeftBtn?: boolean,
  rightBtn: any,
  leftBtn: any,
  onClickRightBtn: void,
  onClickLeftBtn: void,
};

/** Right button: By default, navigate home when hitting the back button */
const _navigateHome = () => navigate(ROUTES.myAccount);
/** Left button: By default, navigate to the edit account page */
const _navigateEdit = () => navigate(ROUTES.edit);

const Header = ({
  title,
  leftBtn = 'Back',
  rightBtn = 'Edit',
  hideRightBtn,
  hideLeftBtn,
  /**  Give dev the ability to override the default behavior  */
  onClickRightBtn = _navigateEdit,
  onClickLeftBtn = _navigateHome,
}: Props) => {
  return (
    <div className={styles['container']}>
      <div className={styles['header-left']}>
          {!hideLeftBtn ? (
            <FontAwesomeIcon
              onClick={onClickLeftBtn}
              className={styles['fa-back']}
              title="Back"
              icon={faChevronLeft}
            />
          ) : (
            ''
          )}
          <div className={styles['header-title']}>{title}</div>
      </div>
      {!hideRightBtn && (
        <div onClick={onClickRightBtn} className={styles['header-right']}>
          {rightBtn || ''}
        </div>
      )}
    </div>
  );
};

export { Header };
