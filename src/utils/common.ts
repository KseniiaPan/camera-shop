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

export {getFormattedPrice, getFormattedPhoneNumber, validatePhone, humanizeCommentDate, getDateWithoutTime};
