import FocusTrap from 'focus-trap-react';
import {useEffect, useRef} from 'react';
import BasketItem from '../../components/basket-item/basket-item';
import BasketPhoneForm from '../../components/basket-phone-form/basket-phone-form';
import {useAppSelector} from '../../hooks/index';
import {getProductsData} from '../../store/product-process/selectors';
import {ProductModalData} from '../../types/product-types';

type ModalProps = {
  modalData: ProductModalData;
  onModalClose: () => void;
};

function Modal({ onModalClose, modalData }: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (!modalData.isModalOpen) {
        return;
      }

      if (
        !modalRef?.current ||
        modalRef.current.contains((evt?.target as Node) || null)
      ) {
        return;
      }
      onModalClose();
    };
    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [modalData.isModalOpen, onModalClose]);

  useEffect(() => {
    const handleEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [onModalClose]);

  useEffect(() => {
    if (modalData.isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalData.isModalOpen]);

  const products = useAppSelector(getProductsData);
  const openedCameraInfo = products.find(
    (product) => modalData.openedCameraId === product.id
  );

  return (
    <div className={`modal ${modalData.isModalOpen ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Свяжитесь со мной</p>
          {openedCameraInfo && (
            <BasketItem openedCameraInfo={openedCameraInfo} />
          )}
          <BasketPhoneForm onModalClose={onModalClose} />
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
