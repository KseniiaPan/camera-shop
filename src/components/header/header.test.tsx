import { render, screen } from '@testing-library/react';
import Header from './header';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const headerTestId = 'header';
    render(
      <MemoryRouter initialEntries={['#', AppRoute.Main]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
