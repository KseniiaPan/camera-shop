import {Helmet} from 'react-helmet-async';
import {useState} from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Modal from '../../components/modal/modal';
import {ProductModalData} from '../../types/product-types';

const initialState: ProductModalData = {
  isModalOpen: false,
  openedCameraId: null,
};

function MainPage(): JSX.Element {

  const [modalData, setModalData] = useState(initialState);

  const handleModalOpenClick = (id: number|null) => {
    setModalData({isModalOpen: true, openedCameraId: id});
  };

  const handleModalClose = () => {
    setModalData({...modalData, isModalOpen: false});
  };

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
                <img src="img/banner.png" />
              </div>
              <div className="catalog__content">
                <ProductCardsList onModalOpenClick={handleModalOpenClick}/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal onModalClose={handleModalClose} modalData={modalData}/>
    </main>
  );
}

export default MainPage;
