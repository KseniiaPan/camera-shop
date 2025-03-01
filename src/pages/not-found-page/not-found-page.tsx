import styles from './not-found.module.css';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../consts';

function NotFoundPage(): JSX.Element{
  return (
    <section>
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>
      <div className={styles.error__container}>
        <span className={styles.error__code}>404</span>
        <p className={styles.error__text}>Страница не найдена</p>
        <Link to={AppRoute.Main} className={styles.error__returnLink}>Вернуться на главную</Link>
      </div>
    </section>
  );
}
export default NotFoundPage;
