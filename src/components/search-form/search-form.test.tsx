import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils/mock-component';
import SearchForm from './search-form';
import { mockStore } from '../../utils/mocks';
import { AppRoute } from '../../consts';

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SearchForm />, mockStore);
    const searchFormTestId = 'search-form';
    const searchFormPlaceholder = /Поиск по сайту/i;

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        {withStoreComponent}
      </MemoryRouter>);

    const searchForm = screen.getByTestId(searchFormTestId);
    expect(searchForm).toBeInTheDocument();
    expect(screen.getByPlaceholderText(searchFormPlaceholder)).toBeInTheDocument();
  });
});
