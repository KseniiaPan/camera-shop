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

export const MAX_RATING = 5;

export const RATING_STARS = Array.from({length: MAX_RATING}, (_, i) => i + 1);
