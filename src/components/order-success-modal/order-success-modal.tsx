import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import useClickOutside from '../../hooks/use-click-outside';
import useEscKeyClick from '../../hooks/use-esc-key-click';
import useDisableBackground from '../../hooks/use-disable-background';
import { AppRoute } from '../../consts';

type OrderSuccessModalProps = {
  isSuccessModalOpen: boolean;
  onSuccessModalClose: () => void;
};

function OrderSuccessModal({
  onSuccessModalClose,
  isSuccessModalOpen,
}: OrderSuccessModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useClickOutside(isSuccessModalOpen, modalRef, onSuccessModalClose);
  useEscKeyClick(onSuccessModalClose);
  useDisableBackground(isSuccessModalOpen);

  const handleContinueShoppingClick = () => {
    onSuccessModalClose();
    navigate(AppRoute.Main);
  };

  return (
    <FocusTrap
      active={isSuccessModalOpen}
      focusTrapOptions={{
        initialFocus: '.btn--purple',
        tabbableOptions: {
          displayCheck: 'none',
        },
      }}
    >
      <div
        className={`modal modal--narrow ${
          isSuccessModalOpen ? 'is-active' : ''
        }`}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content" ref={modalRef}>
            <p className="title title--h4">Спасибо за покупку</p>
            <svg
              className="modal__icon"
              width={80}
              height={78}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
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
              onClick={onSuccessModalClose}
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

export default OrderSuccessModal;
