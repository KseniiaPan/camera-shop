import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import AddProductModal from '../../components/add-product-modal/add-product-modal';
import AddProductSuccessModal from '../../components/add-product-success-modal/add-product-success-modal';
import LoadingPage from '../loading-page/loading-page';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductsFilter from '../../components/products-filter/products-filter';
import ProductsSorting from '../../components/products-sorting/products-sorting';
import CatalogPagination from '../../components/catalog-pagination/catalog-pagination';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import { ProductFilters } from '../../types/filter-types';
import { ProductSorting } from '../../types/sorting-types';
import { ProductsCatalogPagination } from '../../types/pagination-types';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import {
  getDataLoadingErrorStatus,
  getProductsLoadingStatus,
  getProductsData,
} from '../../store/product-process/selectors';
import {
  ProductsListOption,
  ErrorText,
  FilterSection,
  SortingSection,
  START_PAGE,
  PRODUCTS_COUNT_STEP,
  DISPLAYED_PAGINATION_STEP,
} from '../../consts';
import { useCatalogSearchParams } from '../../hooks/use-catalog-search-params';
import { filterProducts, filterProductsbyPrice } from '../../utils/filtering';
import { sortProducts } from '../../utils/sorting';
import { getVisiblePaginationItems } from '../../utils/pagination';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { getStoredValue } from '../../utils/common';
import { getBasketProdutsAmount } from '../../utils/basket-calculation';
import { changeCartProductsAmount } from '../../store/order-process/order-process';

const initialAddProductModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

const initialSortingState: ProductSorting = {
  sort: 'price',
  direction: 'up',
};

const initialPaginationState: ProductsCatalogPagination = {
  page: START_PAGE.toString(),
};

function CatalogPage(): JSX.Element {
  const [addProductModalData, setAddProductModalData] = useState(
    initialAddProductModalState
  );

  const [isProductSuccessModalOpen, setIsProductSuccessModalOpen] =
    useState(false);

  const [cart, setCart] = useLocalStorage<ProductInfo[]>('cart', []);
  const dispatch = useAppDispatch();

  const {
    page,
    setPagination,
    sort,
    direction,
    setSorting,
    setFilters,
    removeFilters,
    removeNonValidFilters,
    removeMinPriceFilters,
    removeMaxPriceFilters,
    category,
    types,
    levels,
    minPrice,
    maxPrice,
  } = useCatalogSearchParams();

  useEffect(() => {
    if (page === null) {
      setPagination(initialPaginationState);
    }
  }, [page, setPagination]);

  useEffect(() => {
    if (sort === null && direction === null) {
      setSorting(initialSortingState);
    }
  }, [sort, direction, setSorting]);

  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const isProductsDataLoading = useAppSelector(getProductsLoadingStatus);
  const allProducts = useAppSelector(getProductsData);

  const sortedProducts = sortProducts(sort, direction, allProducts);

  const filteredByCharacteristicsProducts = filterProducts(
    sortedProducts,
    category,
    types,
    levels
  );
  const filteredProducts: ProductInfo[] = filterProductsbyPrice(
    filteredByCharacteristicsProducts,
    minPrice,
    maxPrice
  );

  const minPriceFirstProductsList: ProductInfo[] = sortProducts(
    SortingSection.Sort.price,
    SortingSection.Direction.up,
    filteredByCharacteristicsProducts
  );
  const currentMinPrice =
    minPriceFirstProductsList[0] && minPriceFirstProductsList[0].price;
  const currentMaxPrice =
    minPriceFirstProductsList[minPriceFirstProductsList.length - 1] &&
    minPriceFirstProductsList[minPriceFirstProductsList.length - 1].price;

  const displayedProductsStart = (Number(page) - 1) * PRODUCTS_COUNT_STEP;
  const displayedProductsEnd = displayedProductsStart + PRODUCTS_COUNT_STEP;
  const displayedProducts =
    filteredProducts.length > PRODUCTS_COUNT_STEP
      ? filteredProducts.slice(displayedProductsStart, displayedProductsEnd)
      : filteredProducts;

  const pagesCount = Math.ceil(filteredProducts.length / PRODUCTS_COUNT_STEP);
  const allPaginationItems = Array.from(
    { length: pagesCount },
    (_, i) => i + 1
  );

  const visiblePaginationItems = getVisiblePaginationItems(
    allPaginationItems,
    page
  );

  const isNextButtonVisible =
    visiblePaginationItems &&
    visiblePaginationItems[visiblePaginationItems.length - 1] < pagesCount;
  const isPreviousButtonVisible =
    visiblePaginationItems && visiblePaginationItems[0] > START_PAGE;

  const resetPagination = () => {
    setPagination(initialPaginationState);
  };

  const handleAddProductModalOpenClick = (id: number | null) => {
    setAddProductModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleAddProductModalCloseClick = () => {
    setAddProductModalData({ isModalOpen: false, openedCameraId: null });
  };

  const handleSuccessModalOpen = () => {
    setIsProductSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsProductSuccessModalOpen(false);
  };

  const handlePageNumberClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    if (evt.currentTarget.dataset.id !== undefined) {
      setPagination({
        page: evt.currentTarget.dataset.id,
      });
    }
  };

  const handleNextButtonClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const nextActivePage =
      visiblePaginationItems &&
      visiblePaginationItems
        .map((item) => item + DISPLAYED_PAGINATION_STEP)[1]
        .toString();
    if (nextActivePage) {
      setPagination({
        page: nextActivePage,
      });
    }
  };

  const handlePreviousButtonClick = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    const previousActivePage =
      visiblePaginationItems &&
      visiblePaginationItems
        .map((item) => item - DISPLAYED_PAGINATION_STEP)[1]
        .toString();
    if (previousActivePage) {
      setPagination({
        page: previousActivePage,
      });
    }
  };

  const handleSortClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    resetPagination();
    setSorting({
      sort: evt.target.value as ProductSorting['sort'],
    });
  };

  const handleSortDirectionClick = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetPagination();
    setSorting({
      direction: evt.target.value as ProductSorting['direction'],
    });
  };

  const handleCategoryFilterClick = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    resetPagination();
    if (evt.target.value === FilterSection.Category.videocamera) {
      removeNonValidFilters();
    }
    setFilters({
      category: evt.target.value as ProductFilters['category'],
    });
  };

  const handleTypeFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    resetPagination();
    setFilters({
      type: evt.target.value as ProductFilters['type'],
    });
  };

  const handleLevelFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    resetPagination();
    setFilters({
      level: evt.target.value as ProductFilters['level'],
    });
  };

  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value !== undefined &&
      evt.target.value.length > 0 &&
      Number(evt.target.value) > currentMaxPrice
    ) {
      evt.target.value = currentMaxPrice.toString();
    }
    if (
      evt.target.value !== undefined &&
      evt.target.value.length > 0 &&
      maxPrice &&
      Number(evt.target.value) > Number(maxPrice)
    ) {
      evt.target.value = maxPrice;
    }
    if (
      evt.target.value !== undefined &&
      evt.target.value.length > 0 &&
      Number(evt.target.value) < currentMinPrice
    ) {
      evt.target.value = currentMinPrice.toString();
    }

    resetPagination();

    setFilters({
      minPrice: evt.target.value as ProductFilters['minPrice'],
    });
    if (evt.target.value.length === 0) {
      removeMinPriceFilters();
    }
  };

  const handleMaxPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value !== undefined &&
      evt.target.value.length > 0 &&
      Number(evt.target.value) < Number(minPrice)
    ) {
      evt.target.value = minPrice;
    }
    if (
      evt.target.value !== undefined &&
      evt.target.value.length > 0 &&
      Number(evt.target.value) > currentMaxPrice
    ) {
      evt.target.value = currentMaxPrice.toString();
    }

    resetPagination();

    setFilters({
      maxPrice: evt.target.value as ProductFilters['maxPrice'],
    });
    if (evt.target.value.length === 0) {
      removeMaxPriceFilters();
    }
  };

  const handleResetFilterClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    removeFilters();
    resetPagination();
  };

  const handleAddToCartClick = useCallback(
    (product: ProductInfo) => {
      const newCart = cart ? cart.map((cartItem) => ({ ...cartItem })) : [];
      let productInCart = newCart.find((item) => product.name === item.name);
      if (productInCart && productInCart.quantity) {
        productInCart.quantity++;
      } else {
        productInCart = {
          ...product,
          quantity: 1,
        };
        newCart.push(productInCart);
      }
      setCart(newCart);
      handleSuccessModalOpen();
      handleAddProductModalCloseClick();
    },
    [cart, setCart]
  );

  useEffect(() => {
    const currentCartProducts = getStoredValue<ProductInfo[]>('cart', []);
    if (currentCartProducts) {
      const currentCartProductsAmount =
        getBasketProdutsAmount(currentCartProducts);
      dispatch(changeCartProductsAmount(currentCartProductsAmount));
    } else {
      dispatch(changeCartProductsAmount(undefined));
    }
  }, [dispatch, handleAddToCartClick]);

  if (isProductsDataLoading) {
    return <LoadingPage />;
  }

  if (isDataLoadingError) {
    return <ErrorMessage message={ErrorText.ServerError} />;
  }
  return (
    <main>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Banner />
      <div className="page-content">
        <Breadcrumbs />
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <ProductsFilter
                  onCategoryFilterClick={handleCategoryFilterClick}
                  onTypeFilterClick={handleTypeFilterClick}
                  onLevelFilterClick={handleLevelFilterClick}
                  onResetFilterClick={handleResetFilterClick}
                  onMinPriceChange={handleMinPriceChange}
                  onMaxPriceChange={handleMaxPriceChange}
                  category={category}
                  types={types}
                  levels={levels}
                  currentMinPrice={currentMinPrice}
                  currentMaxPrice={currentMaxPrice}
                  requiredMinPrice={minPrice}
                  requiredMaxPrice={maxPrice}
                />
              </div>
              <div className="catalog__content">
                <ProductsSorting
                  onSortClick={handleSortClick}
                  onSortDirectionClick={handleSortDirectionClick}
                  sort={sort}
                  direction={direction}
                />
                {filteredProducts.length > 0 ? (
                  <ProductCardsList
                    products={displayedProducts}
                    onModalOpenClick={handleAddProductModalOpenClick}
                    productsListOption={ProductsListOption.CatalogList}
                  />
                ) : (
                  <ErrorMessage message={ErrorText.FilterError} />
                )}
                {filteredProducts.length > PRODUCTS_COUNT_STEP && (
                  <CatalogPagination
                    pageNumber={Number(page)}
                    paginationItems={visiblePaginationItems}
                    isNextButtonVisible={isNextButtonVisible}
                    isPreviousButtonVisible={isPreviousButtonVisible}
                    onPageNumberClick={handlePageNumberClick}
                    onNextButtonClick={handleNextButtonClick}
                    onPreviousButtonClick={handlePreviousButtonClick}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {addProductModalData.isModalOpen && (
        <AddProductModal
          onAddProductModalClose={handleAddProductModalCloseClick}
          modalData={addProductModalData}
          onAddToCartClick={handleAddToCartClick}
        />
      )}
      {isProductSuccessModalOpen && (
        <AddProductSuccessModal
          onSuccessModalClose={handleSuccessModalClose}
          isSuccessModalOpen={isProductSuccessModalOpen}
        />
      )}
    </main>
  );
}

export default CatalogPage;
