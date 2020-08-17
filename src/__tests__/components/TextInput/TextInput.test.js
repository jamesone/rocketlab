// @flow
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextInput } from '../../../components/TextInput/TextInput';

const setup = (props: Object, testId: string) => {
  const utils = render(<TextInput {...props} data-testid={testId} />);
  const input = utils.getByTestId(testId);
  return {
    input,
    ...utils,
  };
};

test('TextInput value should change when value is inputted', () => {
  const { input } = setup({ label: 'First Name' }, 'input');

  fireEvent.change(input, { target: { value: 'Hello' } });
  expect(input.value).toBe('Hello');
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
});

test('TextInput should not focus if disabled=true', () => {
  const { input } = setup(
    {
      label: 'First Name',
      disabled: true,
    },
    'input',
  );
  fireEvent.focus(input);
  expect(input).not.toHaveFocus();
});
