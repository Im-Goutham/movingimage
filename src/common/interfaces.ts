export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  highest_quality_format: string;
  release_date: string;
}

export interface VideoFormValues {
  id: number;
  name: string;
  author: number;
  categories: number[];
}
