import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UnsplashPhoto, UnsplashError } from '@lumeo/shared-types';

interface UsePhotoByIdParams {
  id?: string;
}

export const usePhotoByIdQuery = ({ id }: UsePhotoByIdParams) => {
  return useQuery<UnsplashPhoto, UnsplashError>({
    queryKey: ['photo', id],
    queryFn: async () => {
      const response = await axios.get<UnsplashPhoto>(`/api/photos/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
