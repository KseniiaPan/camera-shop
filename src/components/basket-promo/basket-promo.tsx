import { ValidityStatus } from '../../consts';
import { getStoredValue } from '../../utils/common';
import { useAppSelector } from '../../hooks/index';
import { getCouponValidityStatus, getCouponPostingStatus } from '../../store/order-process/selectors';
import { ProductInfo } from '../../types/product-types';


type BasketPromoProps = {
  userCoupon: string | null;
  onCouponChange: (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onApplyCouponButtonClick: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function BasketPromo({userCoupon, onCouponChange, onApplyCouponButtonClick}: BasketPromoProps): JSX.Element {

  const currentCouponValidityStatus = useAppSelector(getCouponValidityStatus);
  const isCouponPosting = useAppSelector(getCouponPostingStatus);

  const storedCouponValidity = getStoredValue<string | undefined>('couponValidity', undefined);
  const storedCoupon = getStoredValue<string | null>('coupon', null);
  const currentBasketProducts = getStoredValue<ProductInfo[]>('cart', []);
  const isApplyButtonDisabled = currentBasketProducts && currentBasketProducts.length === 0 || isCouponPosting;
  return (
    <div className="basket__promo">
      <p className="title title--h4">
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className="basket-form">
        <form action="#">
          <div className={`custom-input ${userCoupon && currentCouponValidityStatus === ValidityStatus.Invalid ? 'is-invalid' : ''} ${storedCoupon && currentCouponValidityStatus === ValidityStatus.Valid || storedCoupon && storedCouponValidity === ValidityStatus.Valid ? 'is-valid' : ''}`}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" placeholder="Введите промокод" defaultValue={storedCoupon ? storedCoupon : ''} onBlur={onCouponChange}/>
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" onClick={onApplyCouponButtonClick} disabled = {isApplyButtonDisabled}>
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
