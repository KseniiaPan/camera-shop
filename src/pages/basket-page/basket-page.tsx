import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketProductCard from '../../components/basket-product-card/basket-product-card';
import RemoveProductModal from '../../components/remove-product-modal/remove-product-modal';
import ErrorMessage from '../../components/errorMessage/error-message';
import { getStoredCart } from '../../utils/common';
import { ProductInfo, ProductModalData } from '../../types/product-types';
import { ErrorText } from '../../consts';

const initialRemoveProductModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function BasketPage(): JSX.Element {
  const [removeProductModalData, setDeleteProductModalData] = useState(
    initialRemoveProductModalState
  );
  const currentCartProducts = getStoredCart<ProductInfo[]>('cart', []);

  const handleRemoveProductModalOpen = (id: number | null) => {
    setDeleteProductModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleRemoveProductModalClose = () => {
    setDeleteProductModalData({ isModalOpen: false, openedCameraId: null });
  };

  return (
    <main>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="page-content">
        <Breadcrumbs isBasket />
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {currentCartProducts && currentCartProducts.length > 0 ? (
              <ul className="basket__list">
                {currentCartProducts.map((product) => (
                  <li className="basket-item" key={product.id}>
                    <BasketProductCard
                      openedCameraInfo={product}
                      onRemoveProductModalOpen={handleRemoveProductModalOpen}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ErrorMessage message={ErrorText.BasketError} />
            )}
            <div className="basket__summary">
              <div className="basket__promo">
                <p className="title title--h4">
                  Если у вас есть промокод на скидку, примените его в этом поле
                </p>
                <div className="basket-form">
                  <form action="#">
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Промокод</span>
                        <input
                          type="text"
                          name="promo"
                          placeholder="Введите промокод"
                        />
                      </label>
                      <p className="custom-input__error">Промокод неверный</p>
                      <p className="custom-input__success">Промокод принят!</p>
                    </div>
                    <button className="btn" type="submit">
                      Применить
                    </button>
                  </form>
                </div>
              </div>
              <div className="basket__summary-order">
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Всего:</span>
                  <span className="basket__summary-value">111 390 ₽</span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text">Скидка:</span>
                  <span className="basket__summary-value basket__summary-value--bonus">
                    0 ₽
                  </span>
                </p>
                <p className="basket__summary-item">
                  <span className="basket__summary-text basket__summary-text--total">
                    К оплате:
                  </span>
                  <span className="basket__summary-value basket__summary-value--total">
                    111 390 ₽
                  </span>
                </p>
                <button className="btn btn--purple" type="submit">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {removeProductModalData.isModalOpen && (
        <RemoveProductModal
          onRemoveProductModalClose={handleRemoveProductModalClose}
          modalData={removeProductModalData}
        />
      )}
    </main>
  );
}

export default BasketPage;
