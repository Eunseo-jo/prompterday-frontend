import axios from 'axios';

interface Ingredients {
  inferText: string;
  option: string;
}

export const ingredients = async ({ inferText, option }: Ingredients) => {
  try {
    const response = await axios.post(
      import.meta.env.REACT_APP_GPT_API_GATEWAY,
      {
        description: inferText,
        extractTarget: option,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('ingredients API Error:', error);
    return undefined;
  }
};
