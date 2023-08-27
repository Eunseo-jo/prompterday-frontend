import axios from 'axios';

export const ingredients = async () => {
  try {
    const response = await axios.post(
      import.meta.env.REACT_APP_OCR_API_Gateway,
      {
        version: 'V2',
        requestId: 'id',
        timestamp: 0,
        lang: 'ko',
        images: [
          {
            format: imageFileFormat,
            name: imageFileName,
            data: dataURL,
          },
        ],
      },
      {
        headers: {
          'X-OCR-SECRET': `${import.meta.env.REACT_APP_OCR_API_KEY}`, // 도메인에서 생성한 X-OCR-SECRET
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('OCR API Error:', error);
    return null;
  }
};
