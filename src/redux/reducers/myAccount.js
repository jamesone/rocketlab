// @flow

import { MY_ACCOUNT_ACTIONS } from '../actions';

const initialState: MyAccountFormType = {
  firstName: 'James',
  lastName: 'Wainwright',
  email: 'james@wainwright.com',
  phone: '0412 021 999',
  dob: '1998-05-15',
  bio: 'The most awesome developer out there ;)',
};

const myAccount = (state = initialState, action) => {
  switch (action.type) {
    case MY_ACCOUNT_ACTIONS.SAVE_ACCOUNT_UPDATES:
      return {
        ...state,
        ...action.myAccountInfo,
      };
    default:
      return state;
  }
};

export default myAccount;
