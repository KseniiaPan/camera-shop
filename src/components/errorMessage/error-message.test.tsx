import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedText = /Произошла ошибка при загрузке данных с сервера, попробуйте еще раз/i;
    render(<ErrorMessage />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
