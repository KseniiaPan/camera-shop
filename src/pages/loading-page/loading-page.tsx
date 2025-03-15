import styles from './loading-page.module.css';

function LoadingPage(): JSX.Element {
  return (
    <div className={styles.loader} data-testid="loader"></div>
  );
}

export default LoadingPage;
