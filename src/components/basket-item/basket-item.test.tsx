import {render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import {mockProduct} from '../../utils/mocks';

describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const basketItemTestId = 'basket-item';
    const mockOpenedCameraInfo = mockProduct;
    render(<BasketItem openedCameraInfo={mockOpenedCameraInfo}/>);
    expect(screen.getByTestId(basketItemTestId)).toBeInTheDocument();
  });
});
