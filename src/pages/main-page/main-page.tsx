import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Modal from '../../components/modal/modal';
import LoadingPage from '../loading-page/loading-page';
import ErrorMessage from '../../components/errorMessage/error-message';
import ProductsFilter from '../../components/products-filter/products-filter';
import { ProductModalData } from '../../types/product-types';
import { useAppSelector } from '../../hooks/index';
import { getDataLoadingErrorStatus, getProductsLoadingStatus, getProductsData } from '../../store/product-process/selectors';
import { ProductsListOption } from '../../consts';

const initialState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function MainPage(): JSX.Element {
  const [modalData, setModalData] = useState(initialState);

  const isDataLoadingError = useAppSelector(getDataLoadingErrorStatus);
  const isProductsDataLoading = useAppSelector(getProductsLoadingStatus);
  const products = useAppSelector(getProductsData);

  const handleModalOpenClick = (id: number | null) => {
    setModalData({ isModalOpen: true, openedCameraId: id });
  };

  const handleModalClose = () => {
    setModalData({ isModalOpen: false, openedCameraId: null });
  };

  if (isProductsDataLoading) {
    return <LoadingPage />;
  }

  if (isDataLoadingError) {
    return <ErrorMessage />;
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
                <ProductsFilter />
              </div>
              <div className="catalog__content">
                <ProductCardsList
                  products={products}
                  onModalOpenClick={handleModalOpenClick}
                  productsListOption={ProductsListOption.CatalogList}
                />
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
