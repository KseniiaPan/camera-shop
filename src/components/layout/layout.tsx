import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Layout(): JSX.Element {

  return (
    <div className="wrapper" data-testid="app-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
