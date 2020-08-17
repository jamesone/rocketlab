// @flow

const fieldRequired: string = 'Field required.';
const invalidEmail: string = 'Your email is not a valid email';
const invalidPhone: string = 'Your number is not a valid phone';

/**  A `fieldTitle` could be 'first name' */
const getFieldRequiredText = (fieldTitle: string) =>
  `Your ${fieldTitle} is required`;

export default {
  fieldRequired,
  invalidEmail,
  getFieldRequiredText,
  invalidPhone,
};
