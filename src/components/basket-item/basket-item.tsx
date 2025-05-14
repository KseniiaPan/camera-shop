import { ProductInfo } from '../../types/product-types';
import { ProductCategory, BasketCardOption } from '../../consts';
import { getFormattedPrice } from '../../utils/common';

type BasketItemProps = {
  openedCameraInfo: ProductInfo;
  basketCardOption: string;
};

function BasketItem({
  openedCameraInfo,
  basketCardOption,
}: BasketItemProps): JSX.Element {
  const {
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    vendorCode,
    category,
    type,
    level,
    price,
    quantity,
  } = openedCameraInfo;

  const formattedPrice = getFormattedPrice(price);
  const basketItemName = `${type} ${
    category === ProductCategory.VideoCamera
      ? ProductCategory.VideoCamera.toLowerCase()
      : ProductCategory.PhotoCamera.toLowerCase()
  }`;
  const totalPrice = quantity && price * quantity;
  const formattedTotalPrice = totalPrice && getFormattedPrice(totalPrice);
  return (
    <>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={140}
            height={120}
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description" data-testid="basket-item">
        <p className="basket-item__title">{`${category} «${name}»`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{basketItemName}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        {basketCardOption === BasketCardOption.Modal && (
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formattedPrice} ₽
          </p>
        )}
      </div>
      {basketCardOption !== BasketCardOption.Modal && (
        <>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formattedPrice} ₽
          </p>
          <div className="quantity">
            <button
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1" />
            <input
              type="number"
              id="counter1"
              defaultValue={quantity}
              min={1}
              max={99}
              aria-label="количество товара"
            />
            <button
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price">
            <span className="visually-hidden">Общая цена:</span>
            {formattedTotalPrice} ₽
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </>
      )}
    </>
  );
}

export default BasketItem;
