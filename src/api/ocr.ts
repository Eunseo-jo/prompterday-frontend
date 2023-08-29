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
      'https://e7nd31pts4.apigw.ntruss.com/custom/v1/24573/3e2b65f56cdc69bd54e9541a95a4d31136c3158761727780ee46061372e92766/general',
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
