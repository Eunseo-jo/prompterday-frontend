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
  try {
    const response = await axios.post<ResponseOCR>(
      import.meta.env.REACT_APP_OCR_API_GATEWAY,
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
          'X-OCR-SECRET': `${import.meta.env.REACT_APP_OCR_API_KEY}`,
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
