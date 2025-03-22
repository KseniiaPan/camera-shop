export enum AppRoute {
  Main = '/',
  Product = '/camera/:id',
  NotFound = '*',
}

export enum NameSpace {
  Product = 'Product',
  Promo = 'Promo',
  Review = 'Review',
  Order = 'Order',
}

export enum APIRoute {
  Cameras = '/cameras',
  SimilarCameras = '/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Order = '/orders',
}

export enum TabOption {
  Characteristics = 'Characteristics',
  Description = 'Description',
}

export enum ProductCategory {
  VideoCamera = 'Видеокамера',
  PhotoCamera = 'Фотокамера',
}
export enum RatingOption {
  ReviewCard = 'review-card',
  ProductCard = 'product-card',
  Product = 'product',
}

export enum LogoOption {
  Footer = 'footer',
  Header = 'header',
}

export enum NavigationOption {
  Main = 'main-nav',
  Footer = 'footer',
}

export enum ProductsListOption {
  CatalogList = 'catalog',
  SimilarList = 'similar',
}

export const SimilarProductsSlider = {
  DefaultFisrstIndex: 0,
  DefaultLastIndex: 3,
  Step: 3,
};

export const MAX_RATING = 5;
export const COMMENTS_COUNT_STEP = 3;
export const COMMENTS_DEFAULT_COUNT = 0;

export const RATING_STARS = Array.from({length: MAX_RATING}, (_, i) => i + 1);
export const PHONE_REGEXP = /^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$/;
export const PHONE_INITIAL_VALUE = '';
