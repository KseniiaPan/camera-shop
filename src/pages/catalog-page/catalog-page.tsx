import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Modal from '../../components/modal/modal';
import LoadingPage from '../loading-page/loading-page';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductsFilter from '../../components/products-filter/products-filter';
import ProductsSorting from '../../components/products-sorting/products-sorting';
import CatalogPagination from '../../components/catalog-pagination/catalog-pagination';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import { ProductFilters } from '../../types/filter-types';
import { ProductSorting } from '../../types/sorting-types';
import { ProductsCatalogPagination, PaginationItems } from '../../types/pagination-types';
import { useAppSelector } from '../../hooks/index';
import { getDataLoadingErrorStatus, getProductsLoadingStatus, getProductsData} from '../../store/product-process/selectors';
import { ProductsListOption, ErrorText, FilterSection, SortingSection, START_PAGE, PRODUCTS_COUNT_STEP, DISPLAYED_PAGINATION_STEP, PAGINATION_ITEMS_MIN_COUNT, PAGINATION_ITEMS_MAX_COUNT } from '../../consts';
import { useCatalogSearchParams } from '../../hooks/use-catalog-search-params';
import { filterProducts, filterProductsbyPrice } from '../../utils/filtering';
import { sortProducts } from '../../utils/sorting';

const initialModalState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

const initialSortingState: ProductSorting = {
  sort: 'price',
  direction: 'up'
};

const initialPaginationState: ProductsCatalogPagination = {
  page: START_PAGE.toString()
};

const initialPaginationItemsState: PaginationItems = {
  start: PAGINATION_ITEMS_MIN_COUNT,
  end: PAGINATION_ITEMS_MAX_COUNT
};

function CatalogPage(): JSX.Element {
  const [modalData, setModalData] = useState(initialModalState);
  const [paginationItems, setPaginationItems] = useState(initialPaginationItemsState);

  const {page, setPagination, sort, direction, setSorting, setFilters, removeFilters, removeNonValidFilters, removeMinPriceFilters, removeMaxPriceFilters, category, types, levels, minPrice, maxPrice} = useCatalogSearchParams();

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

  const filteredByCharacteristicsProducts = filterProducts(sortedProducts, category, types, levels);

  const filteredProducts: ProductInfo[] = filterProductsbyPrice(filteredByCharacteristicsProducts, minPrice, maxPrice);

  const minPriceFirstProductsList: ProductInfo[] = sortProducts(SortingSection.Sort.price, SortingSection.Direction.up, filteredByCharacteristicsProducts);

  const currentMinPrice = minPriceFirstProductsList[0] && minPriceFirstProductsList[0].price;
  const currentMaxPrice = minPriceFirstProductsList[minPriceFirstProductsList.length - 1] && minPriceFirstProductsList[minPriceFirstProductsList.length - 1].price;

  const displayedProductsStart = (Number(page) - 1) * PRODUCTS_COUNT_STEP;
  const displayedProductsEnd = displayedProductsStart + PRODUCTS_COUNT_STEP;
  const displayedProducts = filteredProducts.length > PRODUCTS_COUNT_STEP ? filteredProducts.slice(displayedProductsStart, displayedProductsEnd) : filteredProducts;

  const pagesCount = Math.ceil(filteredProducts.length / PRODUCTS_COUNT_STEP);
  const allPaginationItems = Array.from({length: pagesCount}, (_, i) => i + 1);

  const visiblePaginationItems = allPaginationItems.slice(paginationItems.start, paginationItems.end);

  const isNextButtonVisible = visiblePaginationItems[visiblePaginationItems.length - 1] < pagesCount;
  const isPreviousButtonVisible = visiblePaginationItems[0] > 1;

  const resetPagination = () => {
    setPagination(initialPaginationState);
    setPaginationItems(initialPaginationItemsState);
  };

  const handleModalOpenClick = (id: number | null) => {
    setModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleModalClose = () => {
    setModalData({ isModalOpen: false, openedCameraId: null });
  };

  const handlePageNumberClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    if (evt.currentTarget.dataset.id !== undefined) {
      setPagination({
        page: evt.currentTarget.dataset.id
      });
    }
  };

  const handleNextButtonClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    const nextPaginationStart = paginationItems.start + DISPLAYED_PAGINATION_STEP;
    const nextPaginationEnd = paginationItems.end + DISPLAYED_PAGINATION_STEP;
    setPaginationItems({start: nextPaginationStart, end: nextPaginationEnd});

    const nextActivePage = (visiblePaginationItems[0] + 3).toString();
    setPagination({
      page: nextActivePage
    });
  };

  const handlepPreviousButtonClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    const previousPaginationStart = paginationItems.start - DISPLAYED_PAGINATION_STEP;
    const previousPaginationEnd = paginationItems.end - DISPLAYED_PAGINATION_STEP;
    setPaginationItems({start: previousPaginationStart, end: previousPaginationEnd});

    const previousActivePage = (visiblePaginationItems[visiblePaginationItems.length - 1] - 3).toString();

    setPagination({
      page: previousActivePage
    });
  };

  const handleSortClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPagination(initialPaginationState);
    setSorting({
      sort: evt.target.value as ProductSorting['sort'],
    });
  };

  const handleSortDirectionClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPagination(initialPaginationState);
    setSorting({
      direction: evt.target.value as ProductSorting['direction'],
    });
  };

  const handleCategoryFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
    if (evt.target.value !== undefined && evt.target.value.length > 0 && Number(evt.target.value) > currentMaxPrice) {
      evt.target.value = currentMaxPrice.toString();
    }
    if (evt.target.value !== undefined && evt.target.value.length > 0 && maxPrice && Number(evt.target.value) > Number(maxPrice)) {
      evt.target.value = maxPrice;
    }
    if (evt.target.value !== undefined && evt.target.value.length > 0 && Number(evt.target.value) < currentMinPrice) {
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
    if (evt.target.value !== undefined && evt.target.value.length > 0 && Number(evt.target.value) < Number(minPrice)) {
      evt.target.value = minPrice;
    }
    if (evt.target.value !== undefined && evt.target.value.length > 0 && Number(evt.target.value) > currentMaxPrice) {
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

  const handleResetFilterClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    removeFilters();
    resetPagination();
  };

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
                    onModalOpenClick={handleModalOpenClick}
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
                    onPreviousButtonClick={handlepPreviousButtonClick}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      {modalData.isModalOpen && (
        <Modal onModalClose={handleModalClose} modalData={modalData} />
      )}
    </main>
  );
}

export default CatalogPage;
