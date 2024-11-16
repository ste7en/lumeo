import React, { useCallback, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ImageGrid } from '../components/ImageGrid';
import { Pagination } from '../components/Pagination';
import { usePhotosQuery } from '../hooks/usePhotosQuery';
import { useSearchPhotos } from '../hooks/useSearchPhotosQuery';

const ITEMS_PER_PAGE = 20;

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const {data: randomPhotos} = usePhotosQuery({per_page: ITEMS_PER_PAGE});
  const {data, isLoading} = useSearchPhotos({ query: searchQuery, page, per_page: ITEMS_PER_PAGE });

  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query.trim());
    setPage(1);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={onSearch} />
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
