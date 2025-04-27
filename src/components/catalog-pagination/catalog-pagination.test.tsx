import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CatalogPagination from './catalog-pagination';
import { AppRoute } from '../../consts';

describe('Component: CatalogPagination', () => {
  it('should render correctly', () => {
    const catalogPaginationTestId = 'pagination';

    const fakePageNumber = 1;
    const fakePaginationItems = [1, 2, 3];
    const fakeIsPreviousButtonVisible = false;
    const fakeIsNextButtonVisible = false;
    const mockOnPageNumberClick = vi.fn();
    const mockOnNextButtonClick = vi.fn();
    const mockOnPreviousButtonClick = vi.fn();

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        <CatalogPagination
          pageNumber={fakePageNumber}
          paginationItems={fakePaginationItems}
          isPreviousButtonVisible={fakeIsPreviousButtonVisible}
          isNextButtonVisible={fakeIsNextButtonVisible}
          onPageNumberClick={mockOnPageNumberClick} onNextButtonClick={mockOnNextButtonClick}
          onPreviousButtonClick={mockOnPreviousButtonClick}
        />
      </MemoryRouter>
    );
    const catalogPagination = screen.getByTestId(catalogPaginationTestId);
    expect(catalogPagination).toBeInTheDocument();
  });

  it('should render previous button', () => {
    const expectedText = /Назад/i;

    const fakePageNumber = 4;
    const fakePaginationItems = [3, 4, 5];
    const fakeIsPreviousButtonVisible = true;
    const fakeIsNextButtonVisible = false;
    const mockOnPageNumberClick = vi.fn();
    const mockOnNextButtonClick = vi.fn();
    const mockOnPreviousButtonClick = vi.fn();

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        <CatalogPagination
          pageNumber={fakePageNumber}
          paginationItems={fakePaginationItems}
          isPreviousButtonVisible={fakeIsPreviousButtonVisible}
          isNextButtonVisible={fakeIsNextButtonVisible}
          onPageNumberClick={mockOnPageNumberClick} onNextButtonClick={mockOnNextButtonClick}
          onPreviousButtonClick={mockOnPreviousButtonClick}
        />
      </MemoryRouter>
    );
    const previousButton = screen.getByText(expectedText);
    fireEvent.click(previousButton);

    expect(previousButton).toBeInTheDocument();
    expect(mockOnPreviousButtonClick).toBeCalled();
  });

  it('should render next button', () => {
    const expectedText = /Далее/i;

    const fakePageNumber = 1;
    const fakePaginationItems = [1, 2, 3];
    const fakeIsPreviousButtonVisible = false;
    const fakeIsNextButtonVisible = true;
    const mockOnPageNumberClick = vi.fn();
    const mockOnNextButtonClick = vi.fn();
    const mockOnPreviousButtonClick = vi.fn();

    render(
      <MemoryRouter
        initialEntries={[AppRoute.Main]}
      >
        <CatalogPagination
          pageNumber={fakePageNumber}
          paginationItems={fakePaginationItems}
          isPreviousButtonVisible={fakeIsPreviousButtonVisible}
          isNextButtonVisible={fakeIsNextButtonVisible}
          onPageNumberClick={mockOnPageNumberClick} onNextButtonClick={mockOnNextButtonClick}
          onPreviousButtonClick={mockOnPreviousButtonClick}
        />
      </MemoryRouter>
    );

    const nextButton = screen.getByText(expectedText);
    fireEvent.click(nextButton);

    expect(nextButton).toBeInTheDocument();
    expect(mockOnNextButtonClick).toBeCalled();
  });
});
