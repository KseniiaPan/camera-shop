export enum AppRoute {
  Main = '/',
  Product = '/camera/:id',
  Cart = '/card',
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
  Characteristics = 'characteristics',
  Description = 'description',
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

export enum BasketCardOption {
  AddProductModal = 'addProductModal',
  Basket = 'basket',
  DeleteProductModal = 'deleteProductModal',
}

export enum ErrorText {
  ServerError = 'Произошла ошибка при загрузке данных с сервера, попробуйте еще раз',
  FilterError = 'Не удалось найти подходящий продукт, попробуйте изменить параметры поиска',
  SearchError = 'Совпадения не найдены',
  BasketError = 'Ваша корзина пуста',
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
  },
} as const;

export const DiscountOption = {
  MinimalDiscount: {
    quantity: 2,
    discount: 3,
  },
  MediumDiscount: {
    quantity: 5,
    discount: 5,
  },
  MediumPlusDiscount: {
    quantity: 6,
    discount: 10,
  },
  MaximalDiscount: {
    quantity: 10,
    discount: 15,
  },
} as const;

export const DiscountReductionOption = {
  MinimalDiscountReduction: {
    sum: 10000,
    discountReductionStep: 1,
  },
  MediumDiscountReduction: {
    sum: 20000,
    discountReductionStep: 2,
  },
  MaximalDiscountReduction: {
    sum: 30000,
    discountReductionStep: 3,
  },
} as const;

export const MAX_RATING = 5;
export const COMMENTS_COUNT_STEP = 3;
export const COMMENTS_DEFAULT_COUNT = 0;
export const SEARCH_VALUE_MIN_LENGTH = 3;
export const RESET_VALUE_MIN_LENGTH = 1;
export const START_PAGE = 1;
export const PRODUCTS_COUNT_STEP = 9;
export const DISPLAYED_PAGINATION_STEP = 2;
export const PAGINATION_ITEMS_MIN_COUNT = 0;
export const PAGINATION_ITEMS_MAX_COUNT = 3;
export const BASKET_PRODUCTS_MIN_COUNT = 1;
export const BASKET_PRODUCTS_MAX_COUNT = 99;
export const PRODUCT_DEFAULT_QUANTITY = 1;
