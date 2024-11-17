import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UnsplashPhoto, UnsplashError, PaginationParams } from '@lumeo/shared-types';

export const usePhotosQuery = (params?: PaginationParams) => {
  return useQuery<UnsplashPhoto[], UnsplashError>({
    queryKey: ['searchPhotos', params?.page, params?.per_page],
    queryFn: async () => {
      const response = await axios.get<UnsplashPhoto[]>('/api/photos', {
        params: { page: params?.page, per_page: params?.per_page },
      });
      return response.data;
    },
  });
};
