import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../../components/layout/layout';
import {AppRoute} from '../../consts';
import {ProductPreviewCard} from '../../types/product';

type AppProps = {
  cards: ProductPreviewCard[];
}

function App({cards}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              path={AppRoute.Main}
              element={<MainPage cards={cards}/>}
            />
            <Route
              path={AppRoute.Product}
              element={<ProductPage />}
            />
            <Route
              path={AppRoute.NotFound}
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
