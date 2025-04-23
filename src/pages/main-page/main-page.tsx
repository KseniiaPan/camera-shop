import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Modal from '../../components/modal/modal';
import LoadingPage from '../loading-page/loading-page';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductsFilter from '../../components/products-filter/products-filter';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import { ProductFilters } from '../../types/filter-types';
import { useAppSelector } from '../../hooks/index';
import {
  getDataLoadingErrorStatus,
  getProductsLoadingStatus,
  getProductsData,
} from '../../store/product-process/selectors';
import {
  ProductsListOption,
  ErrorText,
  SortingOption,
  FilterSection,
} from '../../consts';
import { useProductFilters } from '../../hooks/use-products-filter';
import { filterProducts, filterProductsbyPrice } from '../../utils/filtering';
import { sortProducts } from '../../utils/sorting';

const initialState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function MainPage(): JSX.Element {
  const [modalData, setModalData] = useState(initialState);

  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const isProductsDataLoading = useAppSelector(getProductsLoadingStatus);
  const allProducts = useAppSelector(getProductsData);
  const {
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
  } = useProductFilters();

  const filteredByCharacteristicsProducts = filterProducts(
    allProducts,
    category,
    types,
    levels,
  );

  const filteredProducts: ProductInfo[] = filterProductsbyPrice(filteredByCharacteristicsProducts, minPrice, maxPrice);
  const minPriceFirstProductsList = sortProducts(
    filteredByCharacteristicsProducts,
    SortingOption.MinPriceFirst
  );
  const maxPriceFirstProductsList: ProductInfo[] = sortProducts(
    filteredByCharacteristicsProducts,
    SortingOption.MaxPriceFirst
  );
  const currentMinPrice =
    minPriceFirstProductsList[0] &&
    minPriceFirstProductsList[0].price.toString();
  const currentMaxPrice =
    maxPriceFirstProductsList[0] &&
    maxPriceFirstProductsList[0].price.toString();

  const handleModalOpenClick = (id: number | null) => {
    setModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleModalClose = () => {
    setModalData({ isModalOpen: false, openedCameraId: null });
  };

  const handleCategoryFilterClick = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.value === FilterSection.Category.videocamera) {
      removeNonValidFilters();
    }
    setFilters({
      category: evt.target.value as ProductFilters['category'],
    });
  };

  const handleTypeFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      type: evt.target.value as ProductFilters['type'],
    });
  };

  const handleLevelFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      level: evt.target.value as ProductFilters['level'],
    });

  const handleMinPriceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.value !== undefined &&
        evt.target.value.length > 0 &&
        Number(evt.target.value) > Number(currentMaxPrice)
    ) {
      evt.target.value = currentMaxPrice;
    }
    if (
      evt.target.value !== undefined &&
        evt.target.value.length > 0 && maxPrice &&
        Number(evt.target.value) > Number(maxPrice)
    ) {
      evt.target.value = maxPrice;
    }
    if (
      evt.target.value !== undefined &&
        evt.target.value.length > 0 &&
        Number(evt.target.value) < Number(currentMinPrice)
    ) {
      evt.target.value = currentMinPrice;
    }
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
        Number(evt.target.value) > Number(currentMaxPrice)
    ) {
      evt.target.value = currentMaxPrice;
    }
    setFilters({
      maxPrice: evt.target.value as ProductFilters['maxPrice'],
    });
    if (evt.target.value.length === 0) {
      removeMaxPriceFilters();
    }
  };

  const handleResetFilterClick = () => {
    removeFilters();
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
                {filteredProducts && filteredProducts.length > 0 ? (
                  <ProductCardsList
                    products={filteredProducts}
                    onModalOpenClick={handleModalOpenClick}
                    productsListOption={ProductsListOption.CatalogList}
                  />
                ) : (
                  <ErrorMessage message={ErrorText.FilterError} />
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

export default MainPage;
