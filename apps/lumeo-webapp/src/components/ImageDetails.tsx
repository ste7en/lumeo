import React from 'react';
import { Heart } from 'lucide-react';
import { UnsplashPhoto } from '@lumeo/shared-types';
import { useFavorites } from '../store/useFavorites';

interface ImageDetailsProps {
  image: UnsplashPhoto;
}

export const ImageDetails: React.FC<ImageDetailsProps> = ({ image }) => {
  const {addFavorite, removeFavorite, isFavorite} = useFavorites();
  const favorite = isFavorite(image.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(image.id);
    } else {
      addFavorite(image);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className="w-full aspect-video object-cover"
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={image.user?.profile_image?.small}
              alt={image.user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{image.user?.name}</h3>
              <p className="text-sm text-gray-500">@{image.user?.username}</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleFavorite}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
            >
              <Heart
                className={`w-6 h-6
                  ${favorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
              <span>{favorite ? image.likes + 1 : image.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
