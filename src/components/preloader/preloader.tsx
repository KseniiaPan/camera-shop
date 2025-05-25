import styles from './preloader.module.css';
import { getOrderPostingStatus } from '../../store/order-process/selectors';
import { useAppSelector } from '../../hooks/index';

function Preloader(): JSX.Element {
  const isOrderPosting = useAppSelector(getOrderPostingStatus);
  return (
    <div className={`${styles.loader__wrapper} ${isOrderPosting ? styles.active : ''}`}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Preloader;
