import { message } from 'antd';

type TOption = {
  method: string;
  headers: { [key: string]: string };
  body?: BodyInit;
};

export async function request(url: string, method = 'GET', data = null) {
  try {
    const options: TOption = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    message.error(error.message);
    throw error;
  }
}
