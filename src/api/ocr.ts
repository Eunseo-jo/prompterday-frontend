import { ResponseOCR } from '@/types/photo';
import axios from 'axios';

interface RequestOCR {
  dataURL: string;
  imageFileName: string;
  imageFileFormat: string;
}

export const requestOCR = async ({
  dataURL,
  imageFileName,
  imageFileFormat,
}: RequestOCR) => {
  console.log(
    process.env.REACT_APP_OCR_API_GATEWAY,
    process.env.REACT_APP_OCR_API_KEY,
  );
  try {
    const response = await axios.post<ResponseOCR>(
      `${process.env.REACT_APP_OCR_API_GATEWAY}`,
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
          'X-OCR-SECRET': `${process.env.REACT_APP_OCR_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.images[0];
  } catch (error) {
    console.error('OCR API Error:', error);
    return null;
  }
};
