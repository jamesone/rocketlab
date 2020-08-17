// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Header, ScreenContentContainer } from '../../components';
import styles from './MyAccount.module.scss';

type Props = {
  title: string,
  myAccount: MyAccountFormType,
};

const MyAccount = ({ title, myAccount }: Props) => {
  return (
    <div>
      <Header title={title} hideLeftBtn rightBtn="Edit" />
      <ScreenContentContainer className={styles['content-container']}>
        <div className={styles['row']}>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>First Name</div>
            <div>{myAccount.firstName}</div>
          </div>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>Last Name</div>
            <div>{myAccount.lastName}</div>
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>Email</div>
            <div>{myAccount.email}</div>
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>Phone</div>
            <div>{myAccount.phone}</div>
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>Date of Birth</div>
            <div>{myAccount.dob}</div>
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['column']}>
            <div className={styles['account-field-label']}>Bio</div>
            <div>{myAccount.bio}</div>
          </div>
        </div>
      </ScreenContentContainer>
    </div>
  );
};

const mapStateToProps = ({ myAccount }: { myAccount: MyAccountFormType }) => ({
  myAccount,
});

const MyAccountWithData = connect(mapStateToProps, null)(MyAccount);

export { MyAccountWithData as MyAccount, MyAccount as PureMyAccount };
