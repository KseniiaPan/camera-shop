import {ChangeEvent} from 'react';

type BasketPhoneFormProps = {
  onPhoneValueChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  isValidationError: boolean;
  phoneNumber: string;
}
function BasketPhoneForm({onPhoneValueChange, isValidationError, phoneNumber}:BasketPhoneFormProps): JSX.Element {

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
            type="tel"
            name="user-tel"
            placeholder="Введите ваш номер"
            defaultValue={phoneNumber}
            minLength={10}
            pattern="^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$"
            data-error-message="Номер должен иметь формат +7(9XX)XXX-XX-XX"
            onChange={onPhoneValueChange}
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
