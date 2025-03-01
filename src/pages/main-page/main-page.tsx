import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import {ProductPreviewCard} from '../../types/product';

type MainPageProps = {
  cards: ProductPreviewCard[];
}

function MainPage({cards}: MainPageProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
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
                  <ProductCardsList cards={cards}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
