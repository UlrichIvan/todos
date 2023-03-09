import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '../pages/NotFound';

test.skip('NotFound.jsx', () => {
    render(<NotFound />);
    let element = screen.getByTestId('button')
    userEvent.click(element)
    expect(element).toHaveTextContent("1")
});
