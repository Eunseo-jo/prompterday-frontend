import { ValuesRef, ResponseItem } from '@/types/common';
import axios from 'axios';

export const getResult = async (
  { disease, inferText, option }: ValuesRef,
  retryCount = 0,
): Promise<ResponseItem[] | undefined> => {
  let url = '';

  if (option === 'NUTRITIONIST') {
    url = `${process.env.REACT_APP_GPT_API_GETRESULT_NUTRITIONIST}`;
  } else if (option === 'CHEMIST') {
    url = `${process.env.REACT_APP_GPT_API_GETRESULT_CHEMIST}`;
  }

  try {
    const response = await axios.post(
      url,
      {
        diseases: disease,
        ingredients: inferText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('result API Error:', error);

    if (retryCount < 3) {
      console.log(`Retrying (${retryCount + 1})...`);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return getResult({ disease, inferText, option }, retryCount + 1);
    } else {
      throw new Error('API request failed after three attempts');
    }
  }
};
