export interface ResponseItem {
  name: string;
  criteria: number;
  reason: string | null;
  characteristic: string;
  intake: string | null;
}

export interface Result {
  danger: ResponseItem[];
  warn: ResponseItem[];
  normal: ResponseItem[];
}
