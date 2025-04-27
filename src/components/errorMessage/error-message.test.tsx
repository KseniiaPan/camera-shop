import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';
import { ErrorText } from '../../consts';

describe('Component: ErrorMessage', () => {
  it('should render correctly when error is caused by server', () => {
    const errorText = ErrorText.ServerError;
    const expectedText = /Произошла ошибка при загрузке данных с сервера, попробуйте еще раз/i;
    render(<ErrorMessage message={errorText}/>);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when error is caused by filters', () => {
    const errorText = ErrorText.FilterError;
    const expectedText = /Не удалось найти подходящий продукт, попробуйте изменить параметры поиска/i;
    render(<ErrorMessage message={errorText}/>);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
