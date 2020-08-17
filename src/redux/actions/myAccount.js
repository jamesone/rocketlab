// @flow

const ACTIONS = {
  SAVE_ACCOUNT_UPDATES: 'SAVE_ACCOUNT_UPDATES',
};

/**
 * This action saves the updated account information
 * to our redux store.
 */
const saveAccountUpdates = (myAccountInfo: MyAccountFormType) => ({
  type: ACTIONS.SAVE_ACCOUNT_UPDATES,
  myAccountInfo,
});

export { ACTIONS as MY_ACCOUNT_ACTIONS, saveAccountUpdates };
