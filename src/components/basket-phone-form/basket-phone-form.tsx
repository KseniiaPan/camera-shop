import { useState, useRef } from 'react';
import { getFormattedPhoneNumber, validatePhone } from '../../utils/common';
import { PHONE_INITIAL_VALUE } from '../../consts';
import { useAppDispatch } from '../../hooks/index';
import { postOrderAction } from '../../store/api-actions';

type BasketPhoneFormProps = {
  onModalClose: () => void;
  openedCameraId: number;
};

function BasketPhoneForm({ onModalClose, openedCameraId }: BasketPhoneFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>(PHONE_INITIAL_VALUE);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const handlePhoneValueChange = (value: string | undefined): void => {
    if (value) {
      const isPhoneValid = validatePhone(value);

      if (isPhoneValid) {
        const formattedPhoneNumber = getFormattedPhoneNumber(value);
        setPhoneNumber(formattedPhoneNumber);
        setIsValidationError(false);
      } else {
        setIsValidationError(true);
      }
    }
  };

  const handleOrderSubmitButton = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    setPhoneNumber(PHONE_INITIAL_VALUE);
    setIsValidationError(false);
    if (phoneRef.current) {
      phoneRef.current.value = PHONE_INITIAL_VALUE;
    }

    dispatch(postOrderAction({tel: phoneNumber, camerasIds: [openedCameraId],
      coupon: null})).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        onModalClose();
      }
    });
  };

  const isSubmitButtonDisabled =
    phoneNumber === PHONE_INITIAL_VALUE || isValidationError;

  return (
    <>
      <div className={`custom-input form-review__item ${isValidationError ? 'is-invalid' : ''}`}>
        <label>
          <span className="custom-input__label">
            Телефон
            <svg width={9} height={9} aria-hidden="true">
              <use xlinkHref="#icon-snowflake" />
            </svg>
          </span>
          <input
            ref={phoneRef}
            type="tel"
            name="user-tel"
            id="phone"
            placeholder="Введите ваш номер"
            defaultValue={phoneNumber}
            minLength={10}
            pattern="^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$"
            data-error-message="Номер должен иметь формат +7(9XX)XXX-XX-XX или 8(9XX)XXX-XX-XX"
            onChange={() => handlePhoneValueChange(phoneRef.current?.value)}
            required
            data-testid="phoneElement"
          />
        </label>
        {isValidationError && (<p className="custom-input__error">Формат: +7(9XX)XXX-XX-XX / 8(9XX)XXX-XX-XX</p>)}
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleOrderSubmitButton}
          disabled={isSubmitButtonDisabled}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Заказать
        </button>
      </div>
    </>
  );
}
export default BasketPhoneForm;
