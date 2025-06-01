import { render, screen } from '@testing-library/react';
import BasketItem from './basket-item';
import { mockProduct } from '../../utils/mocks';
import { BasketCardOption } from '../../consts';

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const basketItemTestId = 'basket-item';
    const mockOpenedCameraInfo = mockProduct;
    render(<BasketItem openedCameraInfo={mockOpenedCameraInfo} basketCardOption={BasketCardOption.Basket}/>);
    expect(screen.getByTestId(basketItemTestId)).toBeInTheDocument();
  });
});
