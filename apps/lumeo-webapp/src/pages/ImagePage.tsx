import React from 'react';
import { useParams } from 'react-router-dom';
import { ImageDetails } from '../components/ImageDetails';
import { usePhotoByIdQuery } from '../hooks/usePhotoByIdQuery';

export const ImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: image, isLoading } = usePhotoByIdQuery({ id });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {image && <ImageDetails image={image} />}
    </div>
  );
};
