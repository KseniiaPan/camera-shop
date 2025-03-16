import {ProductInfo} from '../../types/product-types';
import {ProductCategory} from '../../consts';
import {getFormattedPrice} from '../../utils/common';

type BasketItemProps = {
  openedCameraInfo: ProductInfo;
};

function BasketItem({openedCameraInfo}: BasketItemProps): JSX.Element {
  const {previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, vendorCode, category, type, level, price} = openedCameraInfo;

  const formattedPrice = getFormattedPrice(price);
  const basketItemName = `${type} ${category === ProductCategory.videoCamera ? ProductCategory.videoCamera.toLowerCase() : ProductCategory.photoCamera.toLowerCase() }`;

  return (
    <div className="basket-item basket-item--short" data-testid="basket-item">
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
      <div className="basket-item__description">
        <p className="basket-item__title">{`${category} «${name}»`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{basketItemName}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>{formattedPrice} ₽
        </p>
      </div>
    </div>
  );
}

export default BasketItem;
