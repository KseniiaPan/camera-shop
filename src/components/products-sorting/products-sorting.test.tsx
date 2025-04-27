import { fireEvent, render, screen } from '@testing-library/react';
import ProductsSorting from './products-sorting';
import { SortingSection} from '../../consts';

describe('Component: ProductsSorting', () => {
  it('should render correctly with initial data', () => {

    const mockOnSortClick = vi.fn();
    const mockOnSortDirectionClick = vi.fn();
    const fakeSort = SortingSection.Sort.price;
    const fakeDirection = SortingSection.Direction.up;

    render(<ProductsSorting onSortClick={mockOnSortClick} onSortDirectionClick={mockOnSortDirectionClick} sort={fakeSort} direction={fakeDirection}/>);

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/По возрастанию/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/По убыванию/i)).toBeInTheDocument();
  });

  it('should call onSortClick', () => {

    const mockOnSortClick = vi.fn();
    const mockOnSortDirectionClick = vi.fn();
    const fakeSort = SortingSection.Sort.price;
    const fakeDirection = SortingSection.Direction.up;

    render(<ProductsSorting onSortClick={mockOnSortClick} onSortDirectionClick={mockOnSortDirectionClick} sort={fakeSort} direction={fakeDirection}/>);

    const sortByPopularityInput = screen.getByLabelText(/по популярности/i);
    fireEvent.click(sortByPopularityInput);
    expect(mockOnSortClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSortDirectionClick', () => {

    const mockOnSortClick = vi.fn();
    const mockOnSortDirectionClick = vi.fn();
    const fakeSort = SortingSection.Sort.price;
    const fakeDirection = SortingSection.Direction.up;

    render(<ProductsSorting onSortClick={mockOnSortClick} onSortDirectionClick={mockOnSortDirectionClick} sort={fakeSort} direction={fakeDirection}/>);

    const sortDownDirectionInput = screen.getByLabelText(/По убыванию/i);
    fireEvent.click(sortDownDirectionInput);
    expect(mockOnSortDirectionClick).toHaveBeenCalledTimes(1);
  });

});

