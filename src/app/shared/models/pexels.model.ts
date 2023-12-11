export interface IPexelsPhotoList {
  page: number;
  per_page: number;
  photos: Array<IPexelsPhoto>;
  total_results: number;
  next_page: string;
}

export interface IPexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: IPexelsSource;
  liked: boolean;
  type?: string;
  alt: string;
}

export interface IPexelsSource {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface IPexelsError {
  code: string;
  status: number;
}

export interface IFeaturedCollection {
  collections: Array<IPexelsCollection>;
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
}

export interface IPexelsCollectionData {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  id: string;
  media: IPexelsPhoto[];
}

export interface IPexelsCollection {
  id: string;
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
  main_image?: string;
}
