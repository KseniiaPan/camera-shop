import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../consts';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={AppRoute.Main} element={<CatalogPage />} />
          <Route path={AppRoute.Product} element={<ProductPage />} />
          <Route path={AppRoute.Cart} element={<BasketPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
