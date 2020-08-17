import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('DOES Render the default My Account title on the opening screen', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/My Account/i);
  expect(titleElement).toBeInTheDocument();
});

test('DOES Render the Edit button on the opening screen', () => {
  const { getByText } = render(<App />);
  const editButton = getByText(/Edit/i);
  expect(editButton).toBeInTheDocument();
});

test('DOES NOT Render the Back button on the opening screen', () => {
  const { queryByText } = render(<App />);
  const backButton = queryByText(/Back/i);
  expect(backButton).not.toBeInTheDocument();
});
