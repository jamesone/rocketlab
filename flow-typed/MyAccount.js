// @flow

/**
 * Any globally used Flow types can be registered here.
 * This method makes using flow types around the codebase
 * super easy as they're made available everywhere.
 */
declare type MyAccountFormType = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dob: string,
  bio: string,
};
