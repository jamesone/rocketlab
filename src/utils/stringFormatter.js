// @flow

const removeSpacesFromText = (str: string): string => str.split(' ').join('');

/**
 * Formats the phone number. If the input length is === 8
 * then the phone number entered is a landline so it should be
 * displayed XXXX XXXX, otherwise we treat it as a mobile
 * XXXX XXX XXX
 */
const formatPhoneNumber = (inNumber: string): string => {
  const number = removeSpacesFromText(inNumber);

  if (number.length === 8) {
    return `${number.substring(0, 4)} ${number.substring(4, 9)}`;
  }

  return `${number.substring(0, 4)} ${number.substring(
    4,
    7,
  )} ${number.substring(7, number.length)}`.trim();
};

export default {
  formatPhoneNumber,
  removeSpacesFromText,
};
