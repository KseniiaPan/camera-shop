import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { PHONE_REGEXP } from '../consts';

const getFormattedPrice = (price:number) => price.toLocaleString('ru-RU');
const getFormattedPhoneNumber = (phoneNumber:string) => {
  let formattedPhoneNumber = phoneNumber.replace(/[(|)| |\-))]/g, '');
  if (formattedPhoneNumber[0] === '8') {
    formattedPhoneNumber = `+7${formattedPhoneNumber.slice(1)}`;
  }
  return formattedPhoneNumber;
};
const validatePhone = (value:string) => PHONE_REGEXP.test(value);

const humanizeCommentDate = (commentDate: string) =>
  dayjs(commentDate).locale('ru').format('DD MMMM');

const getDateWithoutTime = (date: string): string => date.split('T')[0];

function parseJSON<T>(value: string): T|undefined{
  return value === 'undefined' ? undefined : JSON.parse(value);
}

function getStoredCart<T>(key: string, defaultValue: T): T {
  const storedCart = localStorage.getItem(key);
  return storedCart !== null ? parseJSON(storedCart) : defaultValue;
}

export {getFormattedPrice, getFormattedPhoneNumber, validatePhone, humanizeCommentDate, getDateWithoutTime, getStoredCart};
