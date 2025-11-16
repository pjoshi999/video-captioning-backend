export interface CaptionWord {
  word: string;
  start: number;
  end: number;
}

export interface CaptionSegment {
  text: string;
  start: number;
  end: number;
  words: CaptionWord[];
}

export interface UploadResponse {
  success: boolean;
  videoUrl: string;
  filename: string;
  size: number;
  path: string;
}

export interface CaptionResponse {
  success: boolean;
  captions: CaptionSegment[];
  language: string;
  duration: number;
  confidence?: number;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

