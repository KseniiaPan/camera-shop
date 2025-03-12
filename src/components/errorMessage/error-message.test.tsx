import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: Error message', () => {
  it('should render correct', () => {
    const expectedText = /Произошла ошибка при загрузке данных с сервера, попробуйте еще раз/i;
    render(<ErrorMessage />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
