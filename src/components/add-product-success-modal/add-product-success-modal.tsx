import { useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import useClickOutside from '../../hooks/use-click-outside';
import useEscKeyClick from '../../hooks/use-esc-key-click';
import useDisableBackground from '../../hooks/use-disable-background';
import { AppRoute } from '../../consts';

type AddProductSuccessModalProps = {
  isSuccessModalOpen: boolean;
  onSuccessModalClose: () => void;
};

function AddProductSuccessModal({
  onSuccessModalClose,
  isSuccessModalOpen,
}: AddProductSuccessModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useClickOutside(isSuccessModalOpen, modalRef, onSuccessModalClose);
  useEscKeyClick(onSuccessModalClose);
  useDisableBackground(isSuccessModalOpen);

  const handleContinueShoppingClick = () => {
    onSuccessModalClose();

    if (location.pathname !== AppRoute.Main) {
      navigate(AppRoute.Main);
    }
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
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg
              className="modal__icon"
              width={86}
              height={80}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-success" />
            </svg>
            <div className="modal__buttons">
              <button
                className="btn btn--transparent modal__btn"
                onClick={handleContinueShoppingClick}
              >
                Продолжить покупки
              </button>
              <Link
                className="btn btn--purple modal__btn modal__btn--fit-width"
                to={AppRoute.Cart}
              >
                Перейти в корзину
              </Link>
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

export default AddProductSuccessModal;
