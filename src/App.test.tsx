import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async() => {
  render(<App />);
  const linkElement = await screen.findByLabelText("priority");
  expect(linkElement).toBeInTheDocument();
});
