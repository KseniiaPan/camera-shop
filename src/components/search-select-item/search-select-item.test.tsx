import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchSelectItem from './search-select-item';
import { AppRoute } from '../../consts';
import { mockProduct } from '../../utils/mocks';

describe('Component: SearchSelectItem', () => {
  it('should render correctly', () => {
    const searchSelectItemTestId = 'search-select-item';
    const fakeIndex = 0;
    const fakeCurrentFocus = 0;

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        <SearchSelectItem product={mockProduct}
          index={fakeIndex}
          currentFocus={fakeCurrentFocus}
        />
      </MemoryRouter>);
    expect(screen.getByTestId(searchSelectItemTestId)).toBeInTheDocument();
  });
});
