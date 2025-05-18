import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { PHONE_REGEXP } from '../consts';
import { ProductInfo } from '../types/product-types';

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
  if (value === 'undefined') {
    return undefined;
  } else {
    const parsedStoredCart = JSON.parse(value) as T;
    return parsedStoredCart;
  }
}

function getStoredValue<T>(key: string, defaultValue: T): T|undefined {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? parseJSON(storedValue) : defaultValue;
}


const getCartProdutsAmount = (cartProducts:ProductInfo[]): number|undefined => cartProducts.reduce(
  (accumulator, currentProduct) => currentProduct.quantity ? accumulator + currentProduct.quantity : accumulator, 0);


export {getFormattedPrice, getFormattedPhoneNumber, validatePhone, humanizeCommentDate, getDateWithoutTime, getStoredValue, getCartProdutsAmount};
