import { render, screen } from '@testing-library/react';
import ProductCardsSimilar from './product-cards-similar';
import { mockProducts } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';

describe('Component: ProductCardsSimilar', () => {
  it('should render correctly', () => {
    const expectedText = /Похожие товары/i;
    const mockHandleModalOpenClick = vi.fn();
    const expectedPreviousButtonLabelText = 'Предыдущий слайд';
    const expectedNextButtonLabelText = 'Следующий слайд';

    render(
      <MemoryRouter initialEntries={[AppRoute.Product]}>
        <ProductCardsSimilar similarProducts={mockProducts} onModalOpenClick ={mockHandleModalOpenClick}/>
      </MemoryRouter>
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedPreviousButtonLabelText)).toBeInTheDocument();
    expect(screen.getByLabelText(expectedNextButtonLabelText)).toBeInTheDocument();
  });
});
