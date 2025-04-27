import { fireEvent, render, screen } from '@testing-library/react';
import ProductsFilter from './products-filter';
import { ProductFilters } from '../../types/filter-types';

describe('Component: ProductFilters', () => {
  it('should render correctly at the app start', () => {
    const mockOnCategoryFilterClick = vi.fn();
    const mockOnTypeFilterClickClick = vi.fn();
    const mockOnLevelFilterClick = vi.fn();
    const mockOnResetFilterClick = vi.fn();
    const mockOnMinPriceChange = vi.fn();
    const mockOnMaxPriceChange = vi.fn();
    const fakeCategory = undefined as ProductFilters['category'];
    const fakeTypes = [] as ProductFilters['type'][];
    const fakeLevels = [] as ProductFilters['level'][];
    const fakeCurrentMinPrice = 1990;
    const fakeCurrentMaxPrice = 199000;
    const fakeRequiredMinPrice = '';
    const fakeRequiredMaxPrice = '';

    render(
      <ProductsFilter
        onCategoryFilterClick={mockOnCategoryFilterClick}
        onTypeFilterClick={mockOnTypeFilterClickClick}
        onLevelFilterClick={mockOnLevelFilterClick}
        onResetFilterClick={mockOnResetFilterClick}
        onMinPriceChange={mockOnMinPriceChange}
        onMaxPriceChange={mockOnMaxPriceChange}
        category={fakeCategory}
        types={fakeTypes}
        levels={fakeLevels}
        currentMinPrice={fakeCurrentMinPrice}
        currentMaxPrice={fakeCurrentMaxPrice}
        requiredMinPrice={fakeRequiredMinPrice}
        requiredMaxPrice={fakeRequiredMaxPrice}
      />);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1990')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('199000')).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Сбросить фильтры/i })).toBeInTheDocument();
  });

  it('should call onCategoryFilterClick', () => {

    const mockOnCategoryFilterClick = vi.fn();
    const mockOnTypeFilterClickClick = vi.fn();
    const mockOnLevelFilterClick = vi.fn();
    const mockOnResetFilterClick = vi.fn();
    const mockOnMinPriceChange = vi.fn();
    const mockOnMaxPriceChange = vi.fn();
    const fakeCategory = undefined as ProductFilters['category'];
    const fakeTypes = [] as ProductFilters['type'][];
    const fakeLevels = [] as ProductFilters['level'][];
    const fakeCurrentMinPrice = 1990;
    const fakeCurrentMaxPrice = 199000;
    const fakeRequiredMinPrice = '';
    const fakeRequiredMaxPrice = '';

    render(
      <ProductsFilter
        onCategoryFilterClick={mockOnCategoryFilterClick}
        onTypeFilterClick={mockOnTypeFilterClickClick}
        onLevelFilterClick={mockOnLevelFilterClick}
        onResetFilterClick={mockOnResetFilterClick}
        onMinPriceChange={mockOnMinPriceChange}
        onMaxPriceChange={mockOnMaxPriceChange}
        category={fakeCategory}
        types={fakeTypes}
        levels={fakeLevels}
        currentMinPrice={fakeCurrentMinPrice}
        currentMaxPrice={fakeCurrentMaxPrice}
        requiredMinPrice={fakeRequiredMinPrice}
        requiredMaxPrice={fakeRequiredMaxPrice}
      />);


    const categoryFilterInput = screen.getByTestId('category');
    fireEvent.click(categoryFilterInput);
    expect(mockOnCategoryFilterClick).toHaveBeenCalledTimes(1);
  });

  it('should call onTypeFilterClick', () => {

    const mockOnCategoryFilterClick = vi.fn();
    const mockOnTypeFilterClickClick = vi.fn();
    const mockOnLevelFilterClick = vi.fn();
    const mockOnResetFilterClick = vi.fn();
    const mockOnMinPriceChange = vi.fn();
    const mockOnMaxPriceChange = vi.fn();
    const fakeCategory = undefined as ProductFilters['category'];
    const fakeTypes = [] as ProductFilters['type'][];
    const fakeLevels = [] as ProductFilters['level'][];
    const fakeCurrentMinPrice = 1990;
    const fakeCurrentMaxPrice = 199000;
    const fakeRequiredMinPrice = '';
    const fakeRequiredMaxPrice = '';

    render(
      <ProductsFilter
        onCategoryFilterClick={mockOnCategoryFilterClick}
        onTypeFilterClick={mockOnTypeFilterClickClick}
        onLevelFilterClick={mockOnLevelFilterClick}
        onResetFilterClick={mockOnResetFilterClick}
        onMinPriceChange={mockOnMinPriceChange}
        onMaxPriceChange={mockOnMaxPriceChange}
        category={fakeCategory}
        types={fakeTypes}
        levels={fakeLevels}
        currentMinPrice={fakeCurrentMinPrice}
        currentMaxPrice={fakeCurrentMaxPrice}
        requiredMinPrice={fakeRequiredMinPrice}
        requiredMaxPrice={fakeRequiredMaxPrice}
      />);


    const digitalTypeFilterInput = screen.getByTestId('digital');
    fireEvent.click(digitalTypeFilterInput);
    expect(mockOnTypeFilterClickClick).toHaveBeenCalledTimes(1);
  });

  it('should call onLevelFilterClick', () => {

    const mockOnCategoryFilterClick = vi.fn();
    const mockOnTypeFilterClickClick = vi.fn();
    const mockOnLevelFilterClick = vi.fn();
    const mockOnResetFilterClick = vi.fn();
    const mockOnMinPriceChange = vi.fn();
    const mockOnMaxPriceChange = vi.fn();
    const fakeCategory = undefined as ProductFilters['category'];
    const fakeTypes = [] as ProductFilters['type'][];
    const fakeLevels = [] as ProductFilters['level'][];
    const fakeCurrentMinPrice = 1990;
    const fakeCurrentMaxPrice = 199000;
    const fakeRequiredMinPrice = '';
    const fakeRequiredMaxPrice = '';

    render(
      <ProductsFilter
        onCategoryFilterClick={mockOnCategoryFilterClick}
        onTypeFilterClick={mockOnTypeFilterClickClick}
        onLevelFilterClick={mockOnLevelFilterClick}
        onResetFilterClick={mockOnResetFilterClick}
        onMinPriceChange={mockOnMinPriceChange}
        onMaxPriceChange={mockOnMaxPriceChange}
        category={fakeCategory}
        types={fakeTypes}
        levels={fakeLevels}
        currentMinPrice={fakeCurrentMinPrice}
        currentMaxPrice={fakeCurrentMaxPrice}
        requiredMinPrice={fakeRequiredMinPrice}
        requiredMaxPrice={fakeRequiredMaxPrice}
      />);


    const zeroLevelFilterInput = screen.getByTestId('zero');
    fireEvent.click(zeroLevelFilterInput);
    expect(mockOnLevelFilterClick).toHaveBeenCalledTimes(1);
  });
});
