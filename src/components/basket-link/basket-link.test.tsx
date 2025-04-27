import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BasketLink from './basket-link';
import { AppRoute } from '../../consts';

describe('Component: BasketLink', () => {
  it('should render correctly', () => {
    const expectedLabelText = 'Корзина';

    render(<MemoryRouter initialEntries={[AppRoute.Main]}> <BasketLink /></MemoryRouter>);
    expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
  });
});

