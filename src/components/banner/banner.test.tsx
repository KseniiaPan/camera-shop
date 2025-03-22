import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Banner from './banner';
import { AppRoute } from '../../consts';
import { withStore } from '../../utils/mock-component';
import { mockStore } from '../../utils/mocks';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const bannerTestId = 'banner';

    const { withStoreComponent } = withStore(
      <Banner />,
      mockStore
    );
    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        {withStoreComponent}
      </MemoryRouter>);
    expect(screen.getByTestId(bannerTestId)).toBeInTheDocument();
  });
});
