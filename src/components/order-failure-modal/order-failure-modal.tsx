import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import useClickOutside from '../../hooks/use-click-outside';
import useEscKeyClick from '../../hooks/use-esc-key-click';
import useDisableBackground from '../../hooks/use-disable-background';
import { AppRoute } from '../../consts';

type OrderSuccessModalProps = {
  isFailureModalOpen: boolean;
  onFailureModalClose: () => void;
};

function OrderFailureModal({onFailureModalClose, isFailureModalOpen}: OrderSuccessModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useClickOutside(isFailureModalOpen, modalRef, onFailureModalClose);
  useEscKeyClick(onFailureModalClose);
  useDisableBackground(isFailureModalOpen);

  const handleContinueShoppingClick = () => {
    onFailureModalClose();
    navigate(AppRoute.Main);
  };

  return (
    <FocusTrap
      active={isFailureModalOpen}
      focusTrapOptions={{
        initialFocus: '#continue-shopping',
        tabbableOptions: {
          displayCheck: 'none',
        },
      }}
    >
      <div
        className={`modal modal--narrow ${
          isFailureModalOpen ? 'is-active' : ''
        }`}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content" ref={modalRef}>
            <p className="title title--h4">Не удалось оформить заказ</p>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                id="continue-shopping"
                type="button"
                onClick={handleContinueShoppingClick}
              >
                Вернуться к покупкам
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onFailureModalClose}
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

export default OrderFailureModal;
