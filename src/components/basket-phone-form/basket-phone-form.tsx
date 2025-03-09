import {useRef} from 'react';

type BasketPhoneFormProps = {
  onPhoneValueChange: (phone: string | undefined) => void;
  isValidationError: boolean;
}
function BasketPhoneForm({onPhoneValueChange, isValidationError}:BasketPhoneFormProps): JSX.Element {
  const phoneRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="custom-input form-review__item">
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
            placeholder="Введите ваш номер"
            minLength={10}
            pattern="^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$"
            data-error-message="Номер должен иметь формат +7(9XX)XXX-XX-XX"
            onChange={() => onPhoneValueChange(phoneRef.current?.value)}
            required
          />
        </label>
        <p className="custom-input__error">Нужно указать номер</p>
      </div>
      {isValidationError && <div style={{color: 'red', marginBottom: 15}}>Номер должен иметь формат +7(9XX)XXX-XX-XX</div>}
    </>
  );
}
export default BasketPhoneForm;
