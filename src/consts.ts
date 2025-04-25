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

export enum ErrorText {
  ServerError = 'Произошла ошибка при загрузке данных с сервера, попробуйте еще раз',
  FilterError = 'Не удалось найти подходящий продукт, попробуйте изменить параметры поиска',
}

export const SimilarProductsSlider = {
  DefaultFisrstIndex: 0,
  DefaultLastIndex: 3,
  Step: 3,
} as const;

export const filterItems = [
  {
    name: 'videocamera',
    ruName: 'Видеокамера',
  },
  {
    name: 'photocamera',
    ruName: 'Фотоаппарат',
  },
  {
    name: 'digital',
    ruName: 'Цифровая',
  },
  {
    name: 'film',
    ruName: 'Плёночная',
  },
  {
    name: 'snapshot',
    ruName: 'Моментальная',
  },
  {
    name: 'collection',
    ruName: 'Коллекционная',
  },
  {
    name: 'zero',
    ruName: 'Нулевой',
  },
  {
    name: 'non-professional',
    ruName: 'Любительский',
  },
  {
    name: 'professional',
    ruName: 'Профессиональный',
  },
];

export const initialPaginationItems = [1, 2, 3];

export const FilterSection = {
  Category: {
    photocamera: 'photocamera',
    videocamera: 'videocamera',
  },
  Type: {
    digital: 'digital',
    film: 'film',
    snapshot: 'snapshot',
    collection: 'collection',
  },
  Level: {
    zero: 'zero',
    nonProfessional: 'non-professional',
    professional: 'professional',
  },
} as const;

export const SortingSection = {
  Sort: {
    price: 'price',
    popular: 'popular',
  },
  Direction: {
    up: 'up',
    down: 'down',
  }
} as const;

export const MAX_RATING = 5;
export const COMMENTS_COUNT_STEP = 3;
export const COMMENTS_DEFAULT_COUNT = 0;
export const SEARCH_VALUE_MIN_LENGTH = 3;
export const RESET_VALUE_MIN_LENGTH = 1;
export const START_PAGE = 1;

export const PHONE_REGEXP =
  /^((\+7|8)((\(\d{3}\)|( )?\d{3})( )?)\d{3}(-| )?\d{2}(-| )?\d{2}(-| )?)$/;
export const PHONE_INITIAL_VALUE = '';
