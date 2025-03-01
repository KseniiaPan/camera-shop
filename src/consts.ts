export enum AppRoute {
  Main = '/',
  Product = '/camera/:id',
  NotFound = '*',
}

export const MAX_RATING = 5;

export const RATING_STARS = Array.from({length: MAX_RATING}, (_, i) => i + 1);
