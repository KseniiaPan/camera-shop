import { render, screen } from '@testing-library/react';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { withStore } from '../../utils/mock-component';
import { mockStore } from '../../utils/mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';

    const { withStoreComponent } = withStore(
      <Header />,
      mockStore
    );

    render(
      <MemoryRouter initialEntries={['#', AppRoute.Main]}>
        {withStoreComponent}
      </MemoryRouter>
    );
    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
