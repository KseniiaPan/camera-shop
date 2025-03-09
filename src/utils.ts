import {PHONE_REGEXP} from './consts';
const getFormattedPrice = (price:number) => price.toLocaleString('ru-RU');
const getFormattedPhoneNumber = (phoneNumber:string) => {
  let formattedPhoneNumber = phoneNumber.replace(/[(|)| |\-))]/g, '');
  if (formattedPhoneNumber[0] === '8') {
    formattedPhoneNumber = `+7${formattedPhoneNumber.slice(1)}`;
  }
  return formattedPhoneNumber;
};
const validatePhone = (value:string) => PHONE_REGEXP.test(value);

export {getFormattedPrice, getFormattedPhoneNumber, validatePhone};
