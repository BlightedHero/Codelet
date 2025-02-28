import { render, screen } from '@testing-library/react';
import CreateAccount from './CreateAccount';

test('renders text field for username', () => {
  render(<CreateAccount />);
  // const linkElement = screen.getByText(/learn react/i);
  const textfield = document.getElementById('username');
  expect(textfield).toBeInTheDocument();
});
