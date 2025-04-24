import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Modal from '../../components/modal/modal';
import LoadingPage from '../loading-page/loading-page';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductsFilter from '../../components/products-filter/products-filter';
import ProductsSorting from '../../components/products-sorting/products-sorting';
import { ProductModalData, ProductInfo } from '../../types/product-types';
import { ProductFilters } from '../../types/filter-types';
import { ProductSorting } from '../../types/sorting-types';
import { useAppSelector } from '../../hooks/index';
import { getDataLoadingErrorStatus, getProductsLoadingStatus, getProductsData} from '../../store/product-process/selectors';
import { ProductsListOption, ErrorText, FilterSection, SortingSection } from '../../consts';
import { useProductFilters } from '../../hooks/use-products-filter';
import {useProductSorting} from '../../hooks/use-products-sorting';
import { filterProducts, filterProductsbyPrice } from '../../utils/filtering';
import { sortProducts } from '../../utils/sorting';

const initialState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function CatalogPage(): JSX.Element {
  const [modalData, setModalData] = useState(initialState);

  const {setFilters, removeFilters, removeNonValidFilters, removeMinPriceFilters, removeMaxPriceFilters, category, types, levels, minPrice, maxPrice} = useProductFilters();

  const {sort, direction, setSorting} = useProductSorting();

  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const isProductsDataLoading = useAppSelector(getProductsLoadingStatus);
  const allProducts = useAppSelector(getProductsData);

  const sortedProducts = sortProducts(sort, direction, allProducts);

  const filteredByCharacteristicsProducts = filterProducts(sortedProducts, category, types, levels);

  const filteredProducts: ProductInfo[] = filterProductsbyPrice(filteredByCharacteristicsProducts, minPrice, maxPrice);

  const minPriceFirstProductsList: ProductInfo[] = sortProducts(SortingSection.Sort.price, SortingSection.Direction.up, filteredByCharacteristicsProducts);

  const currentMinPrice = minPriceFirstProductsList[0] && minPriceFirstProductsList[0].price;
  const currentMaxPrice = minPriceFirstProductsList[minPriceFirstProductsList.length - 1] && minPriceFirstProductsList[minPriceFirstProductsList.length - 1].price;

  const handleModalOpenClick = (id: number | null) => {
    setModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleModalClose = () => {
    setModalData({ isModalOpen: false, openedCameraId: null });
  };

  const handleSortClick = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSorting({
      sort: evt.target.value as ProductSorting['sort'],
    });

  const handleSortDirectionClick = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setSorting({
      direction: evt.target.value as ProductSorting['direction'],
    });

  const handleCategoryFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === FilterSection.Category.videocamera) {
      removeNonValidFilters();
    }
    setFilters({
      category: evt.target.value as ProductFilters['category'],
    });
  };

  const handleTypeFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      type: evt.target.value as ProductFilters['type'],
    });

  const handleLevelFilterClick = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setFilters({
      level: evt.target.value as ProductFilters['level'],
    });

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
                <ProductsSorting onSortClick={handleSortClick} onSortDirectionClick={handleSortDirectionClick} sort={sort} direction={direction}/>
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

export default CatalogPage;
