import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {toast} from 'react-toastify';
import {StatusCodes} from 'http-status-codes';

type DetailMessageType = {
  type: string;
  message: string;
}
const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
};
const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
