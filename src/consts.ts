export enum AppRoute {
  Main = '/',
  Product = '/camera/:id',
  NotFound = '*',
}

export enum NameSpace {
  Product = 'Product',
  Promo = 'Promo',
  Review = 'Review',
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
  videoCamera = 'Видеокамера',
  photoCamera = 'Фотокамера',
}

export const MAX_RATING = 5;

export const RATING_STARS = Array.from({length: MAX_RATING}, (_, i) => i + 1);
export const PHONE_REGEXP = /^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$/;
export const PHONE_INITIAL_VALUE = '';
