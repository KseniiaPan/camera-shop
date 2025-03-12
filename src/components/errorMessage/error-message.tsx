import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element{
  return (
    <div className={styles.error}>
      Произошла ошибка при загрузке данных с сервера, попробуйте еще раз
    </div>
  );
}
export default ErrorMessage;
