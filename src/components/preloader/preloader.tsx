import styles from './preloader.module.css';
import { getOrderPostingStatus, getCouponPostingStatus } from '../../store/order-process/selectors';
import { useAppSelector } from '../../hooks/index';

function Preloader(): JSX.Element {
  const isOrderPosting = useAppSelector(getOrderPostingStatus);
  const isCouponPosting = useAppSelector(getCouponPostingStatus);
  return (
    <div className={`${styles.loader__wrapper} ${isOrderPosting || isCouponPosting ? styles.active : ''}`}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Preloader;
