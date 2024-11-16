import React from 'react';
import { Link } from 'react-router-dom';
import { UnsplashPhoto } from '@lumeo/shared-types';

interface ImageGridProps {
  images?: UnsplashPhoto[];
  isLoading: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images?.map((image) => (
        <Link
          to={`/image/${image.id}`}
          key={image.id}
          className="group relative overflow-hidden rounded-lg"
        >
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash image'}
            className="w-full aspect-[4/3] object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{image.user?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
