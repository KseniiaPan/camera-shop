import { getFormattedPrice } from '../../utils/common';
import BasketPromo from '../../components/basket-promo/basket-promo';

type BasketSummaryProps = {
  finalCost: number | undefined;
  discount: number | undefined;
  totalCost: number | undefined;
  isOrderButtonDisabled: boolean;
  onOrderSubmitButtonClick: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};
function BasketSummary({
  finalCost,
  discount,
  totalCost,
  isOrderButtonDisabled,
  onOrderSubmitButtonClick,
}: BasketSummaryProps): JSX.Element {
  const formattedDiscount = getFormattedPrice(discount);

  const formattedFinalCost = getFormattedPrice(finalCost);

  const formattedTotalCost = getFormattedPrice(totalCost);

  return (
    <div className="basket__summary">
      <BasketPromo />
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formattedTotalCost} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span
            className={`basket__summary-value ${
              discount && discount > 0 ? 'basket__summary-value--bonus' : ''
            }`}
          >
            {formattedDiscount} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {formattedFinalCost} ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          disabled={isOrderButtonDisabled}
          onClick={onOrderSubmitButtonClick}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
