import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import BasketItem from '../basket-item/basket-item';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import useClickOutside from '../../hooks/use-click-outside';
import useEscKeyClick from '../../hooks/use-esc-key-click';
import useDisableBackground from '../../hooks/use-disable-background';
import { BasketCardOption, AppRoute } from '../../consts';
import { getStoredValue } from '../../utils/common';

type RemoveProductModalProps = {
  modalData: ProductModalData;
  onRemoveProductModalClose: () => void;
  onRemoveFromCartClick: (productToRemove: ProductInfo) => void;
};

function RemoveProductModal({
  onRemoveProductModalClose,
  modalData,
  onRemoveFromCartClick,
}: RemoveProductModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalData.isModalOpen, modalRef, onRemoveProductModalClose);
  useEscKeyClick(onRemoveProductModalClose);
  useDisableBackground(modalData.isModalOpen);

  const cartProducts = getStoredValue<ProductInfo[]>('cart', []);
  const openedCameraInfo =
    cartProducts &&
    cartProducts.find((product) => modalData.openedCameraId === product.id);

  return (
    <FocusTrap
      active={modalData.isModalOpen}
      focusTrapOptions={{
        initialFocus: '#delete-produt',
        tabbableOptions: {
          displayCheck: 'none',
        },
      }}
    >
      <div className={`modal ${modalData.isModalOpen ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content" ref={modalRef}>
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              {openedCameraInfo && (
                <BasketItem
                  openedCameraInfo={openedCameraInfo}
                  basketCardOption={BasketCardOption.DeleteProductModal}
                />
              )}
            </div>
            <div className="modal__buttons">
              {openedCameraInfo && (
                <button
                  className="btn btn--purple modal__btn modal__btn--half-width"
                  id="#delete-produt"
                  type="button"
                  onClick={() => onRemoveFromCartClick(openedCameraInfo)}
                >
                  Удалить
                </button>
              )}
              <Link
                className="btn btn--transparent modal__btn modal__btn--half-width"
                to={AppRoute.Main}
              >
                Продолжить покупки
              </Link>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onRemoveProductModalClose}
            >
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default RemoveProductModal;
