
import React from 'react';
import { ImageGrid } from '../components/ImageGrid';
import { useFavorites } from '../store/useFavorites';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Favorites</h1>
      <ImageGrid images={favorites} isLoading={false} />
    </div>
  );
};
