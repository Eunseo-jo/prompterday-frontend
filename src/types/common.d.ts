export interface ResponseItem {
  name: string;
  criteria: number;
  reason: string | null;
  characteristic: string;
  intake: string | null;
}
export interface Results {
  danger: ResponseItem[];
  warn: ResponseItem[];
  normal: ResponseItem[];
}
export interface ValuesRef {
  disease: string[];
  option: string;
  inferText: string[] | undefined;
}
