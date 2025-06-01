import { render, screen } from '@testing-library/react';
import Preloader from './preloader';
import { mockStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';

describe('Component: Preloader', () => {
  it('should render correctly', () => {
    const preloaderTestId = 'preloader';

    const { withStoreComponent } = withStore(
      <Preloader />,
      mockStore
    );

    render(
      withStoreComponent
    );
    expect(screen.getByTestId(preloaderTestId)).toBeInTheDocument();
  });
});
