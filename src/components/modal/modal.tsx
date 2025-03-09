import {ChangeEvent, useState} from 'react';
import {getFormattedPhoneNumber, validatePhone} from '../../utils';
import BasketItem from '../../components/basket-item/basket-item';
import BasketPhoneForm from '../../components/basket-phone-form/basket-phone-form';
import {useAppSelector} from '../../hooks/index';
import {getProductsData} from '../../store/product-process/selectors';
import {ProductModalData} from '../../types/product-types';
import {PHONE_INITIAL_VALUE} from '../../consts';

type ModalProps = {
  modalData: ProductModalData;
  onModalClose: () => void;
};

function Modal({onModalClose, modalData}: ModalProps): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>(PHONE_INITIAL_VALUE);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const products = useAppSelector(getProductsData);
  const openedCameraInfo = products.find((product) => modalData.openedCameraId === product.id);

  const handlePhoneValueChange = (evt: ChangeEvent<HTMLInputElement>):void => {
    const {value} = evt.target;
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

  const handleOrderSubmitButton = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setPhoneNumber(PHONE_INITIAL_VALUE);
    setIsValidationError(false);
    onModalClose();
  };

  const isSubmitButtonDisabled = phoneNumber === PHONE_INITIAL_VALUE || isValidationError;

  return (
    <div className={`modal ${modalData.isModalOpen ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          {openedCameraInfo && <BasketItem openedCameraInfo={openedCameraInfo}/>}
          <BasketPhoneForm onPhoneValueChange={handlePhoneValueChange} isValidationError={isValidationError} phoneNumber={phoneNumber}/>
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
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onModalClose}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
