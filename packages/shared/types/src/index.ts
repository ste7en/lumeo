export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  alt_description: string | null;
  description: string | null;
  likes: number;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  location: {
    city: string | null;
    country: string | null;
    position: {
      latitude: number;
      longitude: number;
    } | null;
  };
  user?: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
    profile_image: {
      small?: string;
      medium?: string;
      large?: string;
    } | null;
  };
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface UnsplashSearchParams extends PaginationParams {
  query: string;
}

export interface UnsplashError {
  errors: string[];
}
