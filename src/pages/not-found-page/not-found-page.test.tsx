import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import NotFoundPage from './not-found-page';
import { AppRoute } from '../../consts';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = /Страница не найдена/i;
    const expectedLinkText = /Вернуться на главную/i;

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[AppRoute.Main]}>
          <NotFoundPage/>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
