import { useRef } from 'react';
import { FocusTrap } from 'focus-trap-react';
import BasketItem from '../../components/basket-item/basket-item';
import { useAppSelector } from '../../hooks/index';
import { getProductsData } from '../../store/product-process/selectors';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import useClickOutside from '../../hooks/use-click-outside';
import useEscKeyClick from '../../hooks/use-esc-key-click';
import useDisableBackground from '../../hooks/use-disable-background';
import { BasketCardOption } from '../../consts';

type AddProductModalProps = {
  modalData: ProductModalData;
  onAddProductModalClose: () => void;
  onAddToCartClick: (product: ProductInfo) => void;
};

function AddProductModal({
  onAddProductModalClose,
  onAddToCartClick,
  modalData,
}: AddProductModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalData.isModalOpen, modalRef, onAddProductModalClose);
  useEscKeyClick(onAddProductModalClose);
  useDisableBackground(modalData.isModalOpen);

  const products = useAppSelector(getProductsData);
  const openedCameraInfo = products.find(
    (product) => modalData.openedCameraId === product.id
  );

  return (
    <FocusTrap
      active={modalData.isModalOpen}
      focusTrapOptions={{
        initialFocus: '#add-product',
        tabbableOptions: {
          displayCheck: 'none',
        },
      }}
    >
      <div className={`modal ${modalData.isModalOpen ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content" ref={modalRef}>
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              {openedCameraInfo && (
                <BasketItem
                  openedCameraInfo={openedCameraInfo}
                  basketCardOption={BasketCardOption.AddProductModal}
                />
              )}
            </div>
            <div className="modal__buttons">
              {openedCameraInfo && (
                <button
                  className="btn btn--purple modal__btn modal__btn--fit-width"
                  id="add-product"
                  type="button"
                  onClick={() => onAddToCartClick(openedCameraInfo)}
                >
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Добавить в корзину
                </button>
              )}
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onAddProductModalClose}
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

export default AddProductModal;
