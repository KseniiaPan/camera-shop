import styles from './error-message.module.css';

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return <div className={styles.error}>{message}</div>;
}
export default ErrorMessage;
