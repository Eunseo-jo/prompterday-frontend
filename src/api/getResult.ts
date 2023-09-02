import { ValuesRef } from '@/types/common';
import axios from 'axios';

export const getResult = async ({ disease, inferText, option }: ValuesRef) => {
  let url = '';

  if (option === 'NUTRITIONIST') {
    url = `${import.meta.env.REACT_APP_GPT_API_GETRESULT_NUTRITIONIST}`;
  } else if (option === 'CHEMIST') {
    url = `${import.meta.env.REACT_APP_GPT_API_GETRESULT_CHEMIST}`;
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
    return undefined;
  }
};
