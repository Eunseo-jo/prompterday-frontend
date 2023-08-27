interface BoundingPoly {
  vertices: Array<{ x: number; y: number }>;
}

interface Field {
  boundingPoly: BoundingPoly;
  inferConfidence: number;
  inferText: string;
  lineBreak: boolean;
  type: string;
  valueType: string;
}

interface ConvertedImageInfo {
  width: number;
  height: number;
  pageIndx: number;
  longImage: boolean;
}

export interface ResponseOCR {
  images: Array<{
    convertedImageInfo: ConvertedImageInfo;
    fields: Array<Field>;
    inferResult: string;
    message: string;
    name: string;
    uid: string;
  }>;
  requestId: string;
  timestamp: Date;
  version: string;
}

export interface ValuesRef {
  disease: string[];
  option: string;
}
