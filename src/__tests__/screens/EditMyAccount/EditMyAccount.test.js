import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PureEditMyAccount } from '../../../screens/EditMyAccount/EditMyAccount';
import { errorMsgHelpers } from '../../../utils';

const myAccountReduxMock = {
  firstName: 'James',
  lastName: 'Wainwright',
  email: 'james@wainwright.com',
  phone: '0412 021 999',
  dob: '1998-05-15',
  bio: 'The most awesome developer out there ;)',
};

const emptyMyAccountReduxMock = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  bio: '',
};

const setup = (props: Object, testId: string) => {
  const utils = render(<PureEditMyAccount {...props} data-testid={testId} />);
  return utils;
};

const PAGE_TITLE = 'My Account';

const getStringRegex = (rgx: string) => new RegExp(rgx, 'i');

test('DOES Render the default My Account title on the opening screen', () => {
  const { getByText } = setup({
    title: PAGE_TITLE,
    myAccount: myAccountReduxMock,
  });
  const titleElement = getByText(/My Account/i);

  expect(titleElement).toBeInTheDocument();
});

test('DOES Render the correct buttons on the initial load', () => {
  const { getByText } = setup({
    title: PAGE_TITLE,
    myAccount: myAccountReduxMock,
  });
  const saveElement = getByText(/Save/i);
  const backElement = getByText(/Back/i);

  expect(saveElement).toBeInTheDocument();
  expect(backElement).toBeInTheDocument();
});

test('Save/Edit button: Ensure behaviour is correct', () => {
  const { getByText, queryByText } = setup({
    title: PAGE_TITLE,
    myAccount: myAccountReduxMock,
    dispatch: () => {},
  });

  /**
   * Test and ensure the Save button turns into an
   * edit button.
   */
  const saveElement = getByText(/Save/i);
  expect(saveElement).toBeInTheDocument();

  fireEvent.click(saveElement);
  expect(queryByText(/Save/i)).not.toBeInTheDocument();

  const editElement = getByText(/Edit/i);
  expect(editElement).toBeInTheDocument();

  /** Ensure that when clicking Edit ~> The save button shows */
  fireEvent.click(editElement);
  expect(saveElement).toBeInTheDocument();
});

test('Save Button: Test the MyAccount form to ensure all required field errors show', () => {
  const { getByText, queryByText } = setup({
    title: PAGE_TITLE,
    myAccount: emptyMyAccountReduxMock,
    dispatch: () => {},
  });

  /** Test to ensure the Save button transitons into an Edit button */
  const saveElement = getByText(/Save/i);
  expect(saveElement).toBeInTheDocument();
  fireEvent.click(saveElement);
  expect(queryByText(/Save/i)).toBeInTheDocument();

  /** Ensure that ALL FIELD REQUIRED errors display. */
  const firstNameError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('first name')),
  );
  const lastNameError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('last name')),
  );
  const emailRequiredError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('email')),
  );

  const phoneRequiredError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('phone')),
  );

  const dobRequiredError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('date of birth')),
  );

  const bioRequiredError = getByText(
    getStringRegex(errorMsgHelpers.getFieldRequiredText('bio')),
  );

  expect(firstNameError).toBeInTheDocument();
  expect(lastNameError).toBeInTheDocument();
  expect(emailRequiredError).toBeInTheDocument();
  expect(phoneRequiredError).toBeInTheDocument();
  expect(dobRequiredError).toBeInTheDocument();
  expect(bioRequiredError).toBeInTheDocument();
});

test('Save Button: Test the MyAccount form to ensure all field type (e.g email) validation shows', () => {
  const { getByText } = setup({
    title: PAGE_TITLE,
    myAccount: {
      email: 'incorrect.com',
      phone: '044',
    },
    dispatch: () => {},
  });

  /**
   * Test and ensure the Save button turns to an
   * edit button.
   */
  const saveElement = getByText(/Save/i);
  expect(saveElement).toBeInTheDocument();
  fireEvent.click(saveElement);

  const invalidEmailError = getByText(
    getStringRegex(errorMsgHelpers.invalidEmail),
  );

  const invalidPhoneError = getByText(
    getStringRegex(errorMsgHelpers.invalidPhone),
  );

  expect(invalidEmailError).toBeInTheDocument();
  expect(invalidPhoneError).toBeInTheDocument();
});
