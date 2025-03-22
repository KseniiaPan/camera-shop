import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './banner.css';

import { useAppSelector } from '../../hooks/index';
import { getPromoProductsData } from '../../store/promo-process/selectors';
import { AppRoute } from '../../consts';

function Banner(): JSX.Element {
  const promoProducts = useAppSelector(getPromoProductsData);
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
      autoplay={{ delay: 3000 }}
      data-testid="banner"
    >
      {promoProducts.map((promoProduct) => (
        <SwiperSlide key={promoProduct.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${promoProduct.previewImgWebp}, ${promoProduct.previewImgWebp2x} 2x`}
              />
              <img
                src={promoProduct.previewImg}
                srcSet={`${promoProduct.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promoProduct.name}</span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link
                className="btn"
                to={AppRoute.Product.replace(':id', String(promoProduct.id))}
              >
                Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-pagination">{}</div>
    </Swiper>
  );
}

export default Banner;
