import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UnsplashSearchResponse, UnsplashError } from '@lumeo/shared-types';

interface UseSearchPhotosParams {
  query: string;
  page?: number;
  per_page?: number;
}

export const useSearchPhotos = ({ query, page, per_page }: UseSearchPhotosParams) => {
  return useQuery<UnsplashSearchResponse, UnsplashError>({
    queryKey: ['searchPhotos', query, page, per_page],
    queryFn: async () => {
      const response = await axios.get<UnsplashSearchResponse>('/api/search', {
        params: { query, page, per_page },
      });
      return response.data;
    },
    enabled: !!query,
  });
};
