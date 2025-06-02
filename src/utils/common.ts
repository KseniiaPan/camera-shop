import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const getFormattedPrice = (price: number | undefined) =>
  price && price.toLocaleString('ru-RU');

const humanizeCommentDate = (commentDate: string) =>
  dayjs(commentDate).locale('ru').format('DD MMMM');

const getDateWithoutTime = (date: string): string => date.split('T')[0];

function parseJSON<T>(value: string): T | undefined {
  if (value === 'undefined') {
    return undefined;
  } else {
    const parsedStoredCart = JSON.parse(value) as T;
    return parsedStoredCart;
  }
}

function getStoredValue<T>(key: string, defaultValue: T): T | undefined {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? parseJSON(storedValue) : defaultValue;
}

export {
  getFormattedPrice,
  humanizeCommentDate,
  getDateWithoutTime,
  getStoredValue,
};
