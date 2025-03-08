import BasketItem from '../../components/basket-item/basket-item';
import {useAppSelector} from '../../hooks/index';
import {getProductsData} from '../../store/product-process/selectors';
import {ProductModalData} from '../../types/product-types';

type ModalProps = {
  modalData: ProductModalData;
  onModalCloseClick: () => void;
};

function Modal({onModalCloseClick, modalData}: ModalProps): JSX.Element {
  const products = useAppSelector(getProductsData);
  const openedCameraInfo = products.find((product) => modalData.openedCameraId === product.id);

  return (
    <div className={`modal ${modalData.isModalOpen ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          {openedCameraInfo && <BasketItem openedCameraInfo={openedCameraInfo}/>}
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
                required
              />
            </label>
            <p className="custom-input__error">Нужно указать номер</p>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
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
            onClick={onModalCloseClick}
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
