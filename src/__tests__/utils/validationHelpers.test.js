import { validationHelpers } from '../../utils';

const VALID_EMAIL = 'jim@gmail.com';
const INVALID_EMAIL = 'jimgmail.com';

const VALID_LANDLINE = '95055555';
const VALID_MOBILE = '0412902312';

test('Ensure isEmail validation is correct', () => {
  expect(validationHelpers.isEmail(VALID_EMAIL)).toBe(true);
  expect(validationHelpers.isEmail(INVALID_EMAIL)).toBe(false);
});

test('Ensure phone validation is correct', () => {
  /** Test to see if landline & mobile numbers are valid */
  expect(validationHelpers.isValidPhoneNumber(VALID_LANDLINE)).toBe(true);
  expect(validationHelpers.isValidPhoneNumber(VALID_MOBILE)).toBe(true);

  /** Test to see if landline & mobile numbers are invalid */
  expect(validationHelpers.isValidPhoneNumber('041')).toBe(false);
});
