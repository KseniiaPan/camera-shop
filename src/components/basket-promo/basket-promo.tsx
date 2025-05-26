import { ValidityStatus } from '../../consts';
import { getStoredValue } from '../../utils/common';

type BasketPromoProps = {
  onCouponChange: (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onApplyCouponButtonClick: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function BasketPromo({onCouponChange, onApplyCouponButtonClick}: BasketPromoProps): JSX.Element {

  const couponValidity = getStoredValue<string | undefined>('couponValidity', undefined);
  const coupon = getStoredValue<string | null>('coupon', null);

  return (
    <div className="basket__promo">
      <p className="title title--h4">
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className="basket-form">
        <form action="#">
          <div className={`custom-input ${couponValidity === ValidityStatus.Invalid ? 'is-invalid' : ''} ${coupon && couponValidity === ValidityStatus.Valid ? 'is-valid' : ''}`}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" placeholder="Введите промокод" defaultValue={coupon ? coupon : ''} onBlur={onCouponChange}/>
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" onClick={onApplyCouponButtonClick}>
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
