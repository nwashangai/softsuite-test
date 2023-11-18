import { message } from 'antd';
import RequestCache from './RequestCache';

type TOption = {
  method: string;
  headers: { [key: string]: string };
  body?: BodyInit;
};

const requestCache = RequestCache.getInstance();

export async function request(
  url: string,
  method = 'GET',
  data: { [key: string]: any } | null = null
) {
  try {
    const cachedData = requestCache.get(url);
    const options: TOption = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method.toUpperCase() === 'GET' && cachedData) {
      return cachedData;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many request, refresh in one minute');
      }

      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    if (method.toUpperCase() === 'GET') {
      requestCache.set(url, responseData);
    }
    return responseData;
  } catch (error: any) {
    message.error(error.message);
    throw error;
  }
}
