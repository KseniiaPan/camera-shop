import { PRODUCT_DEFAULT_QUANTITY } from '../consts';
import { ProductInfo, PrimaryProductInfo } from '../types/product-types';
import { DiscountOption, DiscountReductionOption, DEFAULT_DISCOUNT } from '../consts';

const getBasketProdutsAmount = (cartProducts: ProductInfo[]): number | undefined =>
  cartProducts.reduce(
    (accumulator, currentProduct) =>
      currentProduct.quantity
        ? accumulator + currentProduct.quantity
        : accumulator,
    0
  );

const getNonPromoBasketProducts = (currentCartProducts: ProductInfo[], currentPromoProducts: PrimaryProductInfo[]): ProductInfo[] =>
  currentCartProducts.filter(
    (currentCartProductsItem) =>
      !currentPromoProducts.some(
        (currentPromoProductsItem) =>
          currentPromoProductsItem.id === currentCartProductsItem.id
      )
  );

const getSummedPrice = (products: ProductInfo[]) =>
  products.reduce(
    (acc: number, item: ProductInfo) =>
      item.quantity ? acc + item.price * item.quantity : acc + item.price,
    0
  );

const getProductsQuantity = (products: ProductInfo[]) =>
  products.reduce(
    (acc: number, item: ProductInfo) =>
      item.quantity ? acc + item.quantity : acc + PRODUCT_DEFAULT_QUANTITY,
    0
  );

const getDiscountForQuantity = (productsQuantity: number) => {
  let discountForQuantity: number;
  if (productsQuantity === DiscountOption.MinimalDiscount.quantity) {
    discountForQuantity = DiscountOption.MinimalDiscount.discount;
  } else if (
    productsQuantity >= DiscountOption.MediumDiscount.quantity &&
    productsQuantity < DiscountOption.MediumPlusDiscount.quantity
  ) {
    discountForQuantity = DiscountOption.MediumDiscount.discount;
  } else if (
    productsQuantity >= DiscountOption.MediumPlusDiscount.quantity &&
    productsQuantity <= DiscountOption.MaximalDiscount.quantity
  ) {
    discountForQuantity = DiscountOption.MediumPlusDiscount.discount;
  } else if (productsQuantity > DiscountOption.MaximalDiscount.quantity) {
    discountForQuantity = DiscountOption.MaximalDiscount.discount;
  } else {
    discountForQuantity = DEFAULT_DISCOUNT;
  }
  return discountForQuantity;
};

const getReducedDiscount = (expectedDiscount: number, productsTotalCost: number) => {
  let reducedDiscount: number;
  if (
    productsTotalCost >= DiscountReductionOption.MinimalDiscountReduction.sum &&
    productsTotalCost < DiscountReductionOption.MediumDiscountReduction.sum
  ) {
    reducedDiscount =
      expectedDiscount -
      DiscountReductionOption.MinimalDiscountReduction.discountReductionStep;
  } else if (
    productsTotalCost >= DiscountReductionOption.MediumDiscountReduction.sum &&
    productsTotalCost <= DiscountReductionOption.MaximalDiscountReduction.sum
  ) {
    reducedDiscount =
      expectedDiscount -
      DiscountReductionOption.MediumDiscountReduction.discountReductionStep;
  } else if (
    productsTotalCost > DiscountReductionOption.MaximalDiscountReduction.sum
  ) {
    reducedDiscount =
      expectedDiscount -
      DiscountReductionOption.MaximalDiscountReduction.discountReductionStep;
  } else {
    {
      reducedDiscount = expectedDiscount;
    }
  }
  return reducedDiscount;
};

const getOrderedProductsIds = (products: ProductInfo[]) => {
  const orderedProductsIds = products.reduce((
    result: number[],
    product: ProductInfo
  ): number[] => {
    const productIdsAmount: number = product.quantity ? product.quantity : PRODUCT_DEFAULT_QUANTITY;
    const nextOrderedProductIds = Array(productIdsAmount).fill(product.id) as number[];
    return [...result, ...nextOrderedProductIds];
  },
  []);
  return orderedProductsIds;
};

const getTotalDiscount = (quantityDiscount: number | undefined, couponDiscount: number | undefined) => {
  if (quantityDiscount !== undefined && couponDiscount !== undefined) {
    return quantityDiscount + couponDiscount;
  } else
  if (quantityDiscount !== undefined && couponDiscount === undefined) {
    return quantityDiscount;
  } else
  if (quantityDiscount === undefined && couponDiscount !== undefined) {
    return couponDiscount;
  }
};

export {
  getBasketProdutsAmount,
  getNonPromoBasketProducts,
  getSummedPrice,
  getProductsQuantity,
  getDiscountForQuantity,
  getReducedDiscount,
  getOrderedProductsIds,
  getTotalDiscount
};
