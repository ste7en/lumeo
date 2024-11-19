import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { ImageGrid } from '../components/ImageGrid';
import { Pagination } from '../components/Pagination';
import { usePhotosQuery } from '../hooks/usePhotosQuery';
import { useSearchPhotos } from '../hooks/useSearchPhotosQuery';
import { useHomePageSearchParams } from '../hooks/useHomePageSearchParams';

const ITEMS_PER_PAGE = 18;

export const HomePage: React.FC = () => {
  const { query, page, setQuery, setPage } = useHomePageSearchParams();

  const {data: randomPhotos} = usePhotosQuery({per_page: ITEMS_PER_PAGE});
  const {data, isLoading} = useSearchPhotos({ query, page, per_page: ITEMS_PER_PAGE });

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={setQuery} />
      <ImageGrid images={data?.results ?? randomPhotos} isLoading={isLoading} />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};
