// @flow
import stringFormatter from './stringFormatter';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_LANDLINE_LENGTH: number = 8;
const VALID_MOBILE_LENGTH: number = 10;

const isEmail = (email: string): boolean => emailRegex.test(email);

/**
 * Basic phone number validation.
 * Please note that this only checks to see if the number is the right
 * length according to our australian phone number standards.
 * 10 = mobile
 * 8 = landline.
 *
 * If this was a real project, I would've implemented the well known
 * libphonenumber-js library.
 */
const isValidPhoneNumber = (inPhoneNumber: string) => {
  const phoneNumber = stringFormatter.removeSpacesFromText(inPhoneNumber);
  if (isNaN(phoneNumber)) {
    return false;
  }
  if (
    phoneNumber.length === VALID_MOBILE_LENGTH ||
    phoneNumber.length === VALID_LANDLINE_LENGTH
  ) {
    return true;
  }

  return false;
};

export default {
  isEmail,
  isValidPhoneNumber,
};
